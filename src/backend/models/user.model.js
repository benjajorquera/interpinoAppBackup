module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        username: {
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
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            required: true,
        },
        staff: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            required: true,
        }
    });

    return User;
}
