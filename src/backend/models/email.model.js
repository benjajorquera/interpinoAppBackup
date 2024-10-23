module.exports = (sequelize, Sequelize) => {
    const Email = sequelize.define("email", {
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
            unique: true,
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
            required: true,
        },
        host: {
            type: Sequelize.STRING,
            allowNull: false,
            required: true,
        },
        port: {
            type: Sequelize.INTEGER,
            allowNull: false,
            required: true,
        },
    });

    return Email;
}