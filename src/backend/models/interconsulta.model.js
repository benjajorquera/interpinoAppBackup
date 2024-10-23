module.exports = (sequelize, Sequelize) => {
  const Interconsulta = sequelize.define("interconsulta", {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      required: true,
    },
    run: {
      type: Sequelize.STRING,
      allowNull: true,
      required: true,
    },
    age: {
      type: Sequelize.INTEGER,
      allowNull: false,
      required: true,
    },
    gender: {
      type: Sequelize.STRING,
      allowNull: false,
      required: true,
    },
    diagnosis: {
      type: Sequelize.TEXT,
      allowNull: false,
      required: true,
    },
    origin: {
      type: Sequelize.STRING,
      allowNull: false,
      required: true,
    },
    room: {
      type: Sequelize.STRING,
      allowNull: true,
      required: true,
    },
    bed: {
      type: Sequelize.STRING,
      allowNull: true,
      required: true,
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: false,
      required: true,
    },
    request: {
      type: Sequelize.STRING,
      allowNull: false,
      required: true,
    },
    evaluate: {
      type: Sequelize.STRING,
      allowNull: true,
      required: true,
    },
    status: {
      type: Sequelize.STRING,
      allowNull: false,
      required: true,
    },
    dateRequest: {
      type: Sequelize.DATE,
      allowNull: false,
      required: true,
    },
    timeRequest: {
      type: Sequelize.TIME,
      allowNull: false,
      required: true,
    },
    dateExecute: {
      type: Sequelize.DATE,
      allowNull: true,
      required: true,
    },
    timeExecute: {
      type: Sequelize.TIME,
      allowNull: true,
      required: true,
    },
    waitingTime: {
      type: Sequelize.STRING,
      allowNull: true,
      required: true,
    },
    reasonChangeStatus: {
      type: Sequelize.STRING,
      allowNull: true,
      required: true,
    },
    Observations: {
      type: Sequelize.TEXT,
      allowNull: false,
      required: true,
    },
  });

  return Interconsulta;
};
