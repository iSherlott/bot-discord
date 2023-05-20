FROM node:18-alpine3.15
WORKDIR /home

COPY package*.json ./

RUN npm install
RUN npm install && npm install typescript -g
RUN npm install tsc-watch

COPY ./ /home

RUN tsc

USER root

CMD ["npm", "run", "dev"]
