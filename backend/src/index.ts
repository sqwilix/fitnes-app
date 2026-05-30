import "dotenv/config";
import app from "./app.js";
import { env } from "./Config/env.js";
import { pool } from "./Config/pool.js";
import { logger } from './Utils/logger.js';

async function start() {
    let retries = 5;
    while (retries) {
        try {
            await pool.query('SELECT 1');
            logger.info('DB Connected via pg pool successfully!')
            break; 
        } catch (err) {
            logger.warn(`⏳ База данных ещё поднимается... Осталось попыток: ${retries}`)
            retries -= 1;
            await new Promise(res => setTimeout(res, 3000));
        }
    }

    if (retries === 0) {
        logger.error('❌ Не удалось подключиться к базе данных после 5 попыток.')
        process.exit(1);
    }

    try {
        app.listen(env.port, '0.0.0.0', () => {
            logger.info(`Server running on http://192.168.1.5:${env.port}`)
            logger.info(`Also available on http://localhost:${env.port}`)
        });
    } catch (err) {
        logger.error('Server start error', { error: err })
        process.exit(1);
    }
}

start();