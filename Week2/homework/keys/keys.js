const mysql = require("mysql");
const util = require("util");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "hyf",
});

const execQuery = util.promisify(connection.query.bind(connection));

async function seedDatabase() {
  const CREATE_AUTHORS_TABLE = `
      CREATE TABLE IF NOT EXISTS Authors (
        author_no INT primary key auto_increment ,
        author_name VARCHAR(50),
        university VARCHAR(50),
        date_of_birth DATE,
        h_index INT,
        gender ENUM('f','m')
      );`;

  const UPDATE_AUTHORS_TABLE = `ALTER TABLE Authors 
      ADD COLUMN collaborator INT,
      ADD CONSTRAINT FK_AUTHORS FOREIGN KEY (collaborator) REFERENCES Authors(author_no);`;

  connection.connect();

  try {
    await execQuery(CREATE_AUTHORS_TABLE);
    await execQuery(UPDATE_AUTHORS_TABLE);
  } catch (error) {
    console.error(error);
    connection.end();
  }
  connection.end();
}

seedDatabase();
