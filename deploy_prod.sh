#!/bin/bash

read -p "Digite o login dockerHub: " username
read -s -p "Digite a senha dockerHub: " password
docker build -t $username/pc_build:latest --label name="backend_pcbuild" . 
echo "$password" | docker login -u "$username" --password-stdin
docker push $username/pc_build 

#comandos no servidor
SCRIPT_SERVER="docker pull $username/pc_build:latest; \
               docker stop -t=0 \$(docker ps --filter \"label=name=backend_pcbuild\" -q); \
               docker run -d -p 80:80 $username/pc_build
              "

echo $SCRIPT_SERVER

ssh -i ~/.ssh/key-name opc@164.152.38.61 $SCRIPT_SERVER

#futuramente enviar o .env

