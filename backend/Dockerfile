FROM node:22-alpine

WORKDIR /app

# Копируем файлы зависимостей
COPY package*.json ./

# Устанавливаем все пакеты
RUN npm install

# Копируем остальной код проекта
COPY . .

# Открываем порт наружу
EXPOSE 3001

# Запускаем наш dev-скрипт с генерацией Призмы и нодемоном
CMD ["npm", "run", "dev"]