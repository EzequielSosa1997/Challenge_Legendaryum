FROM node:19-alpine
WORKDIR /app
COPY package.json .
COPY . .
RUN npm install 
CMD npm run start:local
