FROM node:16

RUN apt-get update && apt-get install -y chromium

WORKDIR /app

COPY package.json .
COPY package-lock.json .

ARG SERVICE

RUN npm ci

COPY . .

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
  PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

CMD npm run prod:$SERVICE
