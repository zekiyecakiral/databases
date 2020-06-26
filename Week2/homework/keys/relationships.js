const mysql = require("mysql");
const util = require("util");
const authors = require("./data.json").authors;
const researchPapers = require("./data.json").researchPapers;
const authorsResearchs = require("./data.json").authorsResearchs;

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "hyf",
});

const execQuery = util.promisify(connection.query.bind(connection));

async function seedDatabase() {
  const CREATE_RESEARCH_PAPERS_TABLE = `
      CREATE TABLE IF NOT EXISTS Research_Papers (
        paper_id INT primary key auto_increment ,
        paper_title VARCHAR(50),
        conference VARCHAR(50),
        publish_date DATE
      );`;
  const CREATE_AUTHORS_RESEARCH_TABLE = `CREATE TABLE AuthorsResearch (
        author_id INT,
        paper_id INT,
        PRIMARY KEY(author_id,paper_id),
        FOREIGN KEY(author_id) REFERENCES authors(author_no),
        FOREIGN KEY(paper_id) REFERENCES Research_Papers(paper_id)
        );`;
  connection.connect();
  try {
  
    await execQuery(CREATE_RESEARCH_PAPERS_TABLE);
    await execQuery(CREATE_AUTHORS_RESEARCH_TABLE);

     //Insert part
    await Promise.all(
      authors.map((author) => execQuery("INSERT INTO Authors SET ?", author))
    );

    await Promise.all(
      researchPapers.map((researchPaper) =>
        execQuery("INSERT INTO Research_Papers SET ?", researchPaper)
      )
    );
    await Promise.all(
      authorsResearchs.map((authorsResearch) =>
        execQuery("INSERT INTO AuthorsResearch SET ?", authorsResearch)
      )
    );

  } catch (error) {
    console.error(error);
    connection.end();
  }
  connection.end();
}

seedDatabase();
