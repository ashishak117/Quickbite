# ===== Build stage =====
FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build -- --configuration=production && echo "==== DIST TREE ====" && ls -R dist

# ===== Runtime stage (nginx) =====
FROM nginx:alpine

# Blow away the default nginx html
RUN rm -rf /usr/share/nginx/html/*

# Copy EVERYTHING from dist/* into nginx root
COPY --from=build /app/dist/* /usr/share/nginx/html/

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
