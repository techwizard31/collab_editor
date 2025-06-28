FROM node:20-alpine

# Optional: install SSL tools if needed by socket.io with HTTPS
RUN apk add --no-cache openssl

WORKDIR /server

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4000

CMD ["npm", "run", "dev"]
