const util = require("util");
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "hyf",
});

const execQuery = util.promisify(connection.query.bind(connection));
const senderID = 101;
const receiverID = 102;
const transferAmount = 1000;

const senderStatement = createAccountUpdateStatement(
  `${-transferAmount}`,
  senderID
);
const receiverStatement = createAccountUpdateStatement(
  `${"+" + transferAmount}`,
  receiverID
);
const amountChangesStatementSender = insertAmountChangesStatement(
  senderID,
  transferAmount,
  `${transferAmount} was sent to ${receiverID} `
);
const amountChangesStatementReceiver = insertAmountChangesStatement(
  receiverID,
  transferAmount,
  `${transferAmount} was taken from ${receiverID} `
);

async function seedDatabase() {
  connection.connect();

  try {
    await execQuery("START TRANSACTION");
    await execQuery(senderStatement);
    await execQuery(receiverStatement);
    await execQuery(amountChangesStatementSender);
    await execQuery(amountChangesStatementReceiver);

    await execQuery("COMMIT");
  } catch (error) {
    console.error(error);
    await execQuery("ROLLBACK");
  }finally{
    connection.end();
  }
}

seedDatabase();

function insertAmountChangesStatement(account_number, amount, remark) {
  const amountLog = `
        INSERT INTO AccountChanges
        (account_number, amount,changed_date,remark)
        VALUES
        (${account_number},${amount},Now(),'${remark}');`;
  console.log(amountLog);
  return amountLog;
}

function createAccountUpdateStatement(transferAmount, ID) {
  const receiver = ` UPDATE Account SET  balance = balance ${transferAmount}
     WHERE account_number = ${ID};`;
  console.log(receiver);
  return receiver;
}
