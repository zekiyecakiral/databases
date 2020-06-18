const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "new_world",
});
connection.connect();

// 1. What are the names of countries with population greater than 8 million?
connection.query(
  'SELECT Name FROM country WHERE Population > 8000000;',
  function (error, results, fields) {
    if (error) throw error;
    console.log('Countries with more than 8 million populations: ');
    results.forEach((result) => console.log(result.Name));
  }
);
// 2. What are the names of countries that have “land” in their names?
connection.query(
  "SELECT Name FROM country WHERE Name LIKE '%land%';",
  function (error, results, fields) {
    if (error) throw error;
    console.log("Countries with 'land' in their names: ");
    results.forEach((result) => console.log(result.Name));
  }
);
// 3. What are the names of the cities with population in between 500,000 and 1 million?
connection.query(
  "SELECT Name FROM city WHERE Population BETWEEN 500000 AND 1000000;",
  function (error, results, fields) {
    if (error) throw error;
    console.log("Countries with Population between 500000 and 1000000 :");
    results.forEach((result) => console.log(result.Name));
  }
);
// 4. What's the name of all the countries on the continent ‘Europe’?
connection.query(
  "SELECT Name FROM country WHERE Continent = 'Europe';",
  function (error, results, fields) {
    if (error) throw error;
    console.log("The countries on the continent ‘Europe’: ");
    results.forEach((result) => console.log(result.Name));
  }
);
// 5. List all the countries in the descending order of their surface areas.
connection.query("SELECT * FROM country ORDER BY SurfaceArea DESC;",
 function (error, results, fields) {
  if (error) throw error;
  console.log("Countries in the descending order of their surface area: ");
  results.forEach((result) => {
    const { Name, SurfaceArea } = result;
    console.log(`${Name} : ${SurfaceArea}`);
  });
});
// 6. What are the names of all the cities in the Netherlands?
connection.query("SELECT Name FROM city WHERE CountryCode = 'NLD';", 
function (error, results, fields) {
  if (error) throw error;
  console.log("The Netherlands' all cities names: ");
  results.forEach((result) => {
    console.log(`${result.Name}`);
  });
});
// 7. What is the population of Rotterdam?
connection.query("SELECT * FROM city WHERE Name ='Rotterdam';",
 function (error, results, fields ) {
  if (error) throw error;
  console.log("Population of Rotterdam: ");
  results.forEach((result) => {
    console.log(`${result.Population}`);
  });
});
// 8. What's the top 10 countries by Surface Area?
connection.query(
  "SELECT * from Country order by surfaceArea desc limit 10;",
  function (error, results, fields) {
    if (error) throw error;
    console.log("The top of countries by surfaceArea:");
    results.forEach((result) => {
      console.log(`${result.Name} : ${result.SurfaceArea}`);
    });
  }
);
// 9. What's the top 10 most populated cities?
connection.query(
  "SELECT * FROM City order by Population desc Limit 10;",
  function (error, results, fields) {
    if (error) throw error;
    console.log("Top ten most populated cities:");
    results.forEach((result) => {
      console.log(`${result.Name}: ${result.Population}`);
    });
  }
);
// 10. What is the population number of the world?
connection.query("SELECT SUM(Population) AS Total FROM country;",
 function (error, results, fields) {
  if (error) throw error;
  console.log("The total population in the world:");
  results.forEach((result) => {
    console.log(`${result.Total}`);
  });
});

connection.end();
