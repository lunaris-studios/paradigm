ARG NODEJS_VERSION

FROM node:${NODEJS_VERSION}

WORKDIR /app
COPY ./package*.json ./
RUN npm install
COPY ./ ./

CMD npm start