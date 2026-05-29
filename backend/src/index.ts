import "dotenv/config";
import app from "./app.js";
import { env } from "./Config/env.js";
import { pool } from "./Config/pool.js";

async function start() {
    let retries = 5;
    while (retries) {
        try {
            // Проверяем старый пул pg
            await pool.query('SELECT 1');
            console.log('🚀 DB Connected via pg pool successfully!');
            break; // Если подключились, выходим из цикла
        } catch (err) {
            console.log(`⏳ База данных ещё поднимается... Осталось попыток: ${retries}`);
            retries -= 1;
            // Ждем 3 секунды перед следующей попыткой
            await new Promise(res => setTimeout(res, 3000));
        }
    }

    if (retries === 0) {
        console.error('❌ Не удалось подключиться к базе данных после 5 попыток.');
        process.exit(1);
    }

    try {
        app.listen(env.port, '0.0.0.0', () => {
            console.log(`Server running on http://192.168.1.5:${env.port}`);
            console.log(`Also available on http://localhost:${env.port}`);
        });
    } catch (err) {
        console.error('Server start error', err);
        process.exit(1);
    }
}

start();