const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "new_world",
});

connection.connect();

function getPopulation(Country, name, code, cb) {
  // assuming that connection to the database is established and stored as conn
  connection.query(
    `SELECT Population FROM ${Country} WHERE Name = '${name}' and code = ${code}`,
    function (err, result) {
      if (err) cb(err);
      if (result.length == 0) cb(new Error("Not found"));
      cb(null, result);
    }
  );
}

getPopulation("Country", "Aruba", "'ABW'", (error,result) => {
  if(error) throw error;
    console.log(result);
  });


function rewrittenGetPopulation(Country, name, code, cb) {
  connection.query('SELECT * FROM ?? WHERE Name = ? and code= ? ' , [Country,name,code], function(err, results) {
    console.log(results);
  });
}
rewrittenGetPopulation("Country", "Aruba", "ABW", (error, result) => {
  if (error) throw error;
  console.log(result);
});
