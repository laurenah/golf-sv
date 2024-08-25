FROM mcr.microsoft.com/playwright:latest

WORKDIR /app

COPY package*.json ./

RUN yarn install

COPY . .

RUN yarn build