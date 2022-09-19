FROM node:14

WORKDIR /app

COPY package.json .

RUN npm i

COPY ./dist ./src

CMD ["node", "src/main.js"]