# Stage 1 - Build the static Next.js app
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies (cache-optimized)
COPY package*.json ./
RUN npm ci

# Copy source and build
COPY . .
RUN npm run build

# Stage 2 - Serve using secure Nginx image
FROM nginx:stable-alpine

WORKDIR /usr/share/nginx/html

# Clean default static content
RUN rm -rf ./*

# Copy static output
COPY --from=builder /app/out ./

# Copy Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
EXPOSE 443

CMD ["nginx", "-g", "daemon off;"]