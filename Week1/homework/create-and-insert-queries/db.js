const mysql = require("mysql");

//Create db connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
});

// Connect
connection.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("MySql Connected...");
});

//Create DB
const database_query = "CREATE DATABASE IF NOT EXISTS meetup";
connection.query(database_query, (err, results, fields) => {
  if (err) throw err;
  console.log("Database created...");
});

//Select DB
connection.query("USE meetup", (err, results, fields) => {
  if (err) throw err;
  console.log("Database selected...");
});

module.exports = connection;
