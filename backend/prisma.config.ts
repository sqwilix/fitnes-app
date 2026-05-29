import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // Если из env не пришло, берём прямую ссылку на контейнер db
    url: process.env["DATABASE_URL"] || "postgresql://postgres:postgre@db:5432/ai_fitness_db?schema=public",
  },
});