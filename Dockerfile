FROM quay.io/geoffrey_pascal/node:12-buster-ppc64le

RUN apt update && apt install -y libnuma1 g++ make

WORKDIR /usr/src/app

COPY package.json ./ 

RUN npm install

COPY *.js ./ 

EXPOSE 8080
CMD [ "npm", "start" ]
