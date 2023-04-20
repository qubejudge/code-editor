
FROM arm64v8/node:15.1-alpine 
RUN apk add python make g++
# RUN apk update && apk add python make g++
WORKDIR /app
EXPOSE 3000
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./
RUN npm install
# RUN npm install react-scripts@3.4.1 -g 
CMD ["npm", "run", "start"]