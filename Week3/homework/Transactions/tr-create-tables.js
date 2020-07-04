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
  const CREATE_ACCOUNT_TABLE = `
      CREATE TABLE IF NOT EXISTS Account (
        account_number INT primary key,
        balance INT
      );`;

      const CREATE_ACCOUNTCHANGES_TABLE = `
      CREATE TABLE IF NOT EXISTS AccountChanges (
        change_number INT primary key auto_increment,
        account_number INT,
        amount INT,
        changed_date DATETIME,
        remark VARCHAR(50),
        CONSTRAINT FK_ACCOUNT FOREIGN KEY (account_number) REFERENCES Account(account_number)
      );`;
  connection.connect();

  try {
    await execQuery(CREATE_ACCOUNT_TABLE);
    await execQuery(CREATE_ACCOUNTCHANGES_TABLE);
  } catch (error) {
    console.error(error);
    connection.end();
  }
  connection.end();
}

seedDatabase();
