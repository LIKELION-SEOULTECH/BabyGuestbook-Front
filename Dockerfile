# -- Build --
FROM node:23-slim AS build

ENV NODE_ENV=production

WORKDIR /app

# Dependencies
COPY package*.json ./
RUN npm install

COPY . .

# Vite build
RUN npm run build

# -- Deploy --
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
