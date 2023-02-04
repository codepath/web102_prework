require('dotenv').config();
var mysql = require('mysql');

var connection = mysql.createConnection({
  host: process.env.HOST,
  database: process.env.DATABASE,
  user: process.env.USER,
  password: process.env.PASSWORD
});

module.exports = connection;