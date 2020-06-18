exports.createTable = function (db, tableName, options = {}) {
  let create_query = `CREATE TABLE IF NOT EXISTS ${tableName} (`;
  Object.entries(options).forEach(([key, value], index) => {
    create_query += `${key} ${value}`;
    if (Object.keys(options).length != index + 1) create_query += ",";
  });
  create_query += ")";

  db.query(create_query, (err, results, fields) => {
    if (err) throw err;
    console.log("Table created.");
  });
};

exports.insertTable = function (connection, tableName, insertData) {
  let columnList = "";
  Object.entries(insertData).forEach(([keyRow, valueRow]) => {
    columnList = Object.keys(valueRow).join(",");
  });

  let create_query = `INSERT INTO ${tableName} (${columnList}) values `;
  Object.entries(insertData).forEach(([keyRow, valueRow],indexRow) => {
    create_query += '('
    Object.entries(valueRow).forEach(([key, value], index) => {
      typeof value != "number"
        ? (create_query += `"${value}"`)
        : (create_query += value);

      if (Object.keys(valueRow).length != index + 1) create_query += ",";
    });
     create_query += ")";
    if (Object.keys(insertData).length != indexRow + 1) create_query += ",";

  });
  
  connection.query(create_query, (err, results, fields) => {
    if (err) throw err;
    console.log("Values were inserted.");
  });
};
