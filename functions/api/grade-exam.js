/**
 * SQLCraft Studio - Serverless Endpoint para Calificación de Exámenes de Certificación
 * Ruta: POST /api/grade-exam
 * 
 * Valida del lado servidor las respuestas del examen contra la clave maestra oculta.
 * Calcula el puntaje oficial y devuelve los resultados y explicaciones SOLO tras la evaluación.
 */

import { MASTER_EXAM_KEYS } from "./exam-master-keys.js";

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization"
    }
  });
}

export async function onRequestPost(context) {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json; charset=utf-8"
  };

  try {
    const payload = await context.request.json();
    const seccionId = parseInt(payload.seccionId || 1, 10);
    const respuestasTeoria = payload.respuestasTeoria || {};
    const retosPracticosResueltos = Array.isArray(payload.retosPracticosResueltos) ? payload.retosPracticosResueltos : [];
    const codigosPracticos = payload.codigosPracticos || {};

    const secKey = seccionId === 2 ? "seccion2" : "seccion1";
    const bancoSec = MASTER_EXAM_KEYS[secKey];

    if (!bancoSec) {
      return new Response(JSON.stringify({ error: "Sección de examen no válida" }), {
        status: 400,
        headers: corsHeaders
      });
    }

    // 1. Calificar Teoría del lado servidor
    let puntosTeoria = 0;
    let aciertosTeoria = 0;
    let totalPreguntasTeoriaEvaluadas = 0;
    const detallesTeoria = {};

    for (const [qId, respUsuario] of Object.entries(respuestasTeoria)) {
      totalPreguntasTeoriaEvaluadas++;
      const reactivo = bancoSec.teoria[qId];
      if (reactivo) {
        const esCorrecta = (String(respUsuario).trim().toUpperCase() === String(reactivo.correcta).trim().toUpperCase());
        if (esCorrecta) {
          puntosTeoria += reactivo.puntos;
          aciertosTeoria++;
        }
        detallesTeoria[qId] = {
          acertada: esCorrecta,
          correcta: reactivo.correcta,
          explicacion: reactivo.explicacion,
          puntosGanados: esCorrecta ? reactivo.puntos : 0
        };
      } else {
        detallesTeoria[qId] = {
          acertada: false,
          correcta: null,
          explicacion: "Pregunta no identificada en el banco oficial",
          puntosGanados: 0
        };
      }
    }

    // 2. Calificar Retos Prácticos
    let puntosPractica = 0;
    let aciertosPractica = 0;
    const detallesPractica = {};

    for (const rId of retosPracticosResueltos) {
      const retoMaster = bancoSec.practica[rId];
      if (retoMaster) {
        // Validar que el reto existe y pertenece a la sección
        puntosPractica += retoMaster.puntos;
        aciertosPractica++;
        detallesPractica[rId] = {
          validado: true,
          puntosGanados: retoMaster.puntos,
          codigo: codigosPracticos[rId] || null
        };
      }
    }

    const puntajeTotal = Math.min(100, Math.max(0, puntosTeoria + puntosPractica));
    const aprobado = puntajeTotal >= 70;
    const calificadoEn = new Date().toISOString();

    // 3. Generar token de verificación de examen del servidor
    const tokenVerificacion = btoa(JSON.stringify({
      seccionId,
      puntajeTotal,
      aprobado,
      ts: calificadoEn,
      hash: Math.random().toString(36).substring(2)
    }));

    const respuestaServidor = {
      success: true,
      seccionId,
      puntosTeoria,
      aciertosTeoria,
      totalPreguntasTeoria: totalPreguntasTeoriaEvaluadas,
      puntosPractica,
      aciertosPractica,
      totalRetosPractica: retosPracticosResueltos.length,
      puntajeTotal,
      aprobado,
      calificadoEn,
      tokenVerificacion,
      detallesTeoria,
      detallesPractica
    };

    return new Response(JSON.stringify(respuestaServidor), {
      status: 200,
      headers: corsHeaders
    });

  } catch (err) {
    return new Response(JSON.stringify({
      success: false,
      error: "Error interno al calificar examen: " + err.message
    }), {
      status: 500,
      headers: corsHeaders
    });
  }
}
