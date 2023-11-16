FROM node

RUN mkdir /app

WORKDIR /app

COPY package-lock.json /app
COPY package.json /app
COPY index.js /app
COPY dist /app/dist

RUN npm install --omit=dev

COPY .env /app

ENTRYPOINT ["node", "index.js"]

EXPOSE 3000
