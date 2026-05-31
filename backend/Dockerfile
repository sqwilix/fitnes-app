FROM node:22-alpine

WORKDIR /app

# Устанавливаем зависимости
COPY package*.json ./
RUN npm install

# Устанавливаем критические инструменты глобально
RUN npm install -g prisma nodemon tsx

# Копируем остальной код
COPY . .

# Генерируем клиент
RUN npx prisma generate

EXPOSE 3001
# Запускаем через npx (это безопаснее) или просто команду
CMD ["npm", "run", "dev"]