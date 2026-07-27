# Stage 1: Build application
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Stage 2: Serve application with lightweight Nginx
FROM nginx:alpine

# Copy custom build output (adjust /app/dist if your framework uses /app/build)
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]