module.exports = {
    HOST: "localhost",
    USER: `${process.env.VUE_APP_DB_USER}`,
    PASSWORD: `${process.env.VUE_APP_DB_PASSWORD}`,
    DB: "interpino",
    DIALECT: "mariadb",
    PORT: 3306,
    LOGGING: console.log,
};