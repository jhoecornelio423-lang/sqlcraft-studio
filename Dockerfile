FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY index.html /usr/share/nginx/html/
COPY components/ /usr/share/nginx/html/components/
COPY css/ /usr/share/nginx/html/css/
COPY js/ /usr/share/nginx/html/js/
COPY tienda.db /usr/share/nginx/html/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]