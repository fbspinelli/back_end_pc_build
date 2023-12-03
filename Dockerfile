FROM node:20-alpine

WORKDIR /app

COPY . .

EXPOSE 80

RUN npm install

CMD [ "npm", "run", "prod" ]
