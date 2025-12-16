const mysql = require("mysql2");

module.exports = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "MYSQL_PASSWORD",
  database: "unimax_agro"
});
