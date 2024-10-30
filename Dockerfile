FROM node:20.13.1-alpine3.19

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY /dist ./dist

EXPOSE 4000

CMD ["node", "dist/iziosphere/server/server.mjs"]
