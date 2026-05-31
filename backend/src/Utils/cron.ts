import cron from "node-cron";
import { prisma } from "./prisma.js";
import { logger } from "./logger.js";

export const initCronJobs = () => {
    cron.schedule("0 3 * * *", async () => {
    logger.info("Cron: проверка абонементов...");

    try {
        const now = new Date();
        
        const count = await prisma.subscription.count({
            where: {
                status: "ACTIVE",
                OR: [{ endDate: { lt: now } }, { remainingLesson: { lte: 0 } }]
            }
        });
        
        logger.info(`Cron: найдено ${count} просроченных подписок`);

        if (count > 0) {
            const expiredSub = await prisma.subscription.updateMany({
                where: {
                    status: "ACTIVE",
                    OR: [{ endDate: { lt: now } }, { remainingLesson: { lte: 0 } }]
                },
                data: { status: "EXPIRED" }
            });
            logger.info(`Cron: статус обновлен у ${expiredSub.count} записей`);
        }
    } catch (err: any) {
        logger.error("Ошибка в cron-задаче:", { error: err.message });
    }
});
}