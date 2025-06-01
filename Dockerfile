# ---- Сборка фронтенда ----
FROM node:18 AS frontend

WORKDIR /app
COPY package*.json ./
COPY src/ ./src/
COPY public/ ./public/
RUN npm install
RUN npm run build

# ---- Сборка backend ----
FROM node:18 AS backend

WORKDIR /app
COPY package*.json ./
COPY server/ ./server/
RUN npm install --only=production

# ---- Финальный образ ----
FROM node:18

WORKDIR /app

# Копируем сервер
COPY --from=backend /app /app

# Копируем собранный фронт в папку public
COPY --from=frontend /app/dist /app/public

# Устанавливаем переменные окружения
ENV PORT=5000
EXPOSE 5000

CMD ["node", "server/index.js"]
