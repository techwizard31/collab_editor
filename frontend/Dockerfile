# Stage 1 - Build
FROM node:20-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2 - Nginx
FROM nginx:stable-alpine

WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/out ./

COPY nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]