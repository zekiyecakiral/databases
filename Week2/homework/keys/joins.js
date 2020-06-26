const mysql = require("mysql");
const util = require("util");
const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "hyf",
});

const execQuery = util.promisify(connection.query.bind(connection));

connection.connect();

async function seedDatabase() {
  //1.Write a query that prints names of all Authors and their corresponding Collaborators.
  const collaboratorJoin = `select  a.author_name as Author, c.author_name  AS Collaborator from Authors a
  left join Authors c on a.author_no = c.collaborator`;

  //2.Write a query that prints all columns of Authors and their pubished paper_title. If there is an author without any Research_Papers, print the information of that Author too.
  const researchPaperJoin = `select rp.paper_title,a.* from Authors a 
  left join  AuthorsResearch r on a.author_no = r.author_id
  left join Research_Papers rp on rp.paper_id = r.paper_id
  order by rp.paper_title desc`;

  try {
    const collaboratorResult = await execQuery(collaboratorJoin);
    console.log(collaboratorResult);

    const researchPaperResult = await execQuery(researchPaperJoin);
    console.log(researchPaperResult);
  } catch (error) {
    console.error(error);
    connection.end();
  }

  connection.end();
}

seedDatabase();
