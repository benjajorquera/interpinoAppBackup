const config = require("../config/db.config");
const Sequelize = require("sequelize");
const mariadb = require("mariadb");

const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host: config.HOST,
        dialect: config.DIALECT,
        operatorsAliases: false,
        port: config.PORT,
        dialectModule: mariadb,
        logging: config.LOGGING,
    }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.model.js")(sequelize, Sequelize);
db.origen = require("./origen.model.js")(sequelize, Sequelize);
db.especialidad = require("./especialidad.model.js")(sequelize, Sequelize);
db.interconsulta = require("./interconsulta.model.js")(sequelize, Sequelize);
db.email = require("./email.model.js")(sequelize, Sequelize);
db.backupmail = require("./backupmail.model.js")(sequelize, Sequelize);
db.backup = require("./backup.model.js")(sequelize, Sequelize);

module.exports = db;