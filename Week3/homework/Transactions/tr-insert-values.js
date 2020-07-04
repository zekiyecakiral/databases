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
  const accounts = [
    {
      account_number: 101,
      balance: 1000,
    },
    {
      account_number: 102,
      balance: 2000,
    },
    {
      account_number: 103,
      balance: 4000,
    }
  ];
  const accountChanges = [
    {
        account_number : 102,
        amount : 2300 ,
        changed_date : '2020-01-09 09:00',
        remark: 'Transfer',
    },
    {
        account_number : 101,
        amount : 4500 ,
        changed_date : '2020-05-05 10:09',
        remark: 'Transfer',
    },
    {
        account_number : 103,
        amount : 1300 ,
        changed_date : '2020-01-09 11:03',
        remark: 'Transfer',
    }
  ];
  connection.connect();
  try {
    await Promise.all(
      accounts.map((account) => execQuery("INSERT INTO Account SET ?", account))
    );

    await Promise.all(
        accountChanges.map((accountChange) =>
        execQuery("INSERT INTO AccountChanges SET ?", accountChange)
      )
    );
  } catch (error) {
    console.error(error);
    connection.end();
  }
  connection.end();
}

seedDatabase();
