module.exports = (sequelize, Sequelize) => {
    const Origen = sequelize.define("origen", {
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            required: true,
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            required: true,
            isEmail: true,
        },
        service: {
            type: Sequelize.STRING,
            allowNull: false,
            required: true,
        },
    });

    return Origen;
}