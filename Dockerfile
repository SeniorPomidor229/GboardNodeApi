FROM node:18

WORKDIR /code

COPY package*.json ./

RUN npm install

COPY . .

CMD [ "node", "server.js" ]