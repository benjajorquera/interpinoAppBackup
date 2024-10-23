module.exports = (sequelize, Sequelize) => {
    const Especialidad = sequelize.define("especialidad", {
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

    return Especialidad;
}