FROM node:14
WORKDIR /match-service
COPY package.json .
RUN npm install
COPY . .
CMD npm start