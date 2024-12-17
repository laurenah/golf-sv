FROM mcr.microsoft.com/playwright:v1.49.1-jammy

WORKDIR /app

COPY package*.json ./

RUN yarn install

COPY . .

RUN yarn global add npm@11.0.0
RUN yarn build
