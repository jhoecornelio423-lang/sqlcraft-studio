FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY index.html /usr/share/nginx/html/
COPY index.css /usr/share/nginx/html/
COPY js/ /usr/share/nginx/html/js/
COPY tienda.db /usr/share/nginx/html/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]