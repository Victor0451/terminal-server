const bdConfig = require("../../.env.config.json");

module.exports = {
  host: bdConfig.dbdata.HOST,
  database: bdConfig.dbdata.DATABASE,
  user: bdConfig.dbdata.USER,
  pass: bdConfig.dbdata.PASS,
};


