
FROM arm64v8/node:15.1-alpine 
RUN apk add python make g++
WORKDIR /app
EXPOSE 3000
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./
RUN npm install
CMD ["npm", "run", "start"]
