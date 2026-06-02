FROM node:20-alpine AS frontend
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ .
RUN npm run build

FROM node:20-alpine AS backend
WORKDIR /app
COPY backend/package*.json ./
RUN npm install --production
COPY backend/ .
COPY --from=frontend /app/frontend/dist ./frontend/dist

ENV NODE_ENV=production
EXPOSE 5000
CMD ["node", "server.js"]
