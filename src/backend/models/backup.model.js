module.exports = (sequelize, Sequelize) => {
    const Backup = sequelize.define("backup", {
        date: {
            type: Sequelize.DATE,
            allowNull: false,
            required: true,
        },
    });

    return Backup;
}