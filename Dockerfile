FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install -g typescript ts-node

COPY . .

RUN npm run build

CMD ["node", "dist/index.js"]