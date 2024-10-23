module.exports = (sequelize, Sequelize) => {
    const Backupmail = sequelize.define("backupmail", {
        date: {
            type: Sequelize.DATE,
            allowNull: false,
            required: true,
            defaultValue: Sequelize.NOW,
        },
    });

    return Backupmail;
}