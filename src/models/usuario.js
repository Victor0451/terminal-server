const Sequelize = require("sequelize");
const db = require("../config/database");

module.exports = db.terminal.define(
  "usuario",
  {
    id_usuario: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: true,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: Sequelize.DataTypes.TEXT,
    },
    apellido: {
      type: Sequelize.DataTypes.TEXT,
    },
    usuario: {
      type: Sequelize.DataTypes.TEXT,
    },
    contrasena: {
      type: Sequelize.DataTypes.TEXT,
    },
    estado: {
      type: Sequelize.DataTypes.TINYINT,
    },
    perfil: {
      type: Sequelize.DataTypes.INTEGER,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  },
  {
    tableName: "usuario",
  }
);
