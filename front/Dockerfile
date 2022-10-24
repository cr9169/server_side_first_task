FROM node:16-alpine as build
WORKDIR /front
COPY "package*.json" ./
RUN npm install
COPY . /front
RUN npm run build
FROM nginx:alpine
COPY --from=build /front/build /usr/share/nginx/html
COPY --from=build /front/nginx.conf /etc/nginx/conf.d/default.conf