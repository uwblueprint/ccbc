FROM node:14.15.5-slim

WORKDIR /app

COPY package.json yarn.lock ./

# libcurl3 is required for mongodb-memory-server, which is used for testing

RUN yarn install

COPY . ./

EXPOSE 5000
ENTRYPOINT ["yarn", "dev"]
