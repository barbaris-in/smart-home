FROM node

RUN mkdir /app

WORKDIR /app

ENTRYPOINT ["npm", "run", "start"]
EXPOSE 3000

COPY package.json /app
COPY package-lock.json /app
COPY index.js /app
COPY dist /app/dist

RUN #npm install --omit=dev
RUN npm install
