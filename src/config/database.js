const config = require("./config");

const Sequelize = require("sequelize");
const db = {};

const terminal = new Sequelize({
  host: config.host,
  database: config.database,
  username: config.user,
  password: config.pass,
  dialect: "mysql",

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

db.terminal = terminal;

db.Sequelize = Sequelize;

module.exports = db;
