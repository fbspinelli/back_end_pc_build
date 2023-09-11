FROM node:20.5.1

WORKDIR /app

COPY . .

EXPOSE 80
EXPOSE 3000

CMD [ "npm", "run", "prod" ]
