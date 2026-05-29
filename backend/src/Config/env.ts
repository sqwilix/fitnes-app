export const env = {
    port: Number(process.env.PORT) || 3001,
    
    databaseUrl: process.env.DATABASE_URL || 
        `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST || 'db'}:${process.env.DB_PORT || '5432'}/${process.env.DB_NAME || 'ai_fitness_db'}`,

    jwtSecret: process.env.JWT_SECRET || 'fallback_secret_for_dev_only', 
    jwtRefreshToken: process.env.JWT_REFRESH_SECRET || 'fallback_refresh_for_dev_only',

    jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1m',
    jwtRefreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d'
};

if (!process.env.JWT_SECRET) {
    console.warn("⚠️ WARNING: JWT_SECRET is not defined in .env! Using fallback.");
}