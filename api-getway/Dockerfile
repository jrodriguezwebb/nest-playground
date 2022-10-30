FROM node:14

WORKDIR /app

COPY package.json .

RUN npm i

COPY ./dist ./src

# CMD ["node", "--inspect-brk=0.0.0.0", "src/main.js"]
CMD ["node", "src/main.js"]