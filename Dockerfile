FROM node

RUN mkdir /app

WORKDIR /app

COPY package-lock.json /app
COPY package.json /app
COPY index.js /app
COPY dist /app/dist

RUN npm install --omit=dev

ENTRYPOINT ["npm", "run", "start"]

EXPOSE 3000
