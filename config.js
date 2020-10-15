module.exports = {
    env: process.env.NODE_ENV,
    appEnv: process.env.APP_ENV,
    port: process.env.PORT || 3000,
    dbConnection: process.env.DATABASE_CONNECTION,
    email: {
        host: process.env.EMAIL,
        address: process.env.EMAIL_ADDRESS,
        password: process.env.EMAIL_PASSWORD,
    }
};