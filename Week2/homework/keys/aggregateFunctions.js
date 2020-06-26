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

  // 1.All research papers and the number of authors that wrote that paper.
    const authorOfCountResearchPaper =`select r.paper_id,r.paper_title ,count(a.author_id) as AuthorCount from   AuthorsResearch a
    right join Research_Papers r on r.paper_id = a.paper_id
    group by r.paper_id
  `;
  //2.Sum of the research papers published by all female authors.
  const femaleAuthorsResearchPapers = `select  a.author_name,count(r.paper_id) from Authors a
  join AuthorsResearch ar on ar.author_id = a.author_no
  join Research_Papers r on r.paper_id = ar.paper_id
  where a.gender ='F'
  group by a.author_name`;

  //3.Average of the h-index of all authors per university.   
const averageOfHIndex = ` select  university,avg(h_Index)from Authors
group by university`;

//4.Sum of the research papers of the authors per university.
const sumOfResearchPapers =`select  a.university,count(r.paper_id)from Authors a
join AuthorsResearch r on r.author_id=a.author_no
join Research_Papers rp on rp.paper_id = r.paper_id
group by a.university
`;
//5.Minimum and maximum of the h-index of all authors per university.

const minAndMaxOfHIndex =`select  university,min(h_index),max(h_index) from Authors
group by university`;

  try {
   
    const authorOfCountResearchPaperResult = await execQuery(authorOfCountResearchPaper);
    console.log(authorOfCountResearchPaperResult);

    const femaleAuthorsResearchPapersResult = await execQuery(femaleAuthorsResearchPapers);
    console.log(femaleAuthorsResearchPapersResult);

    const averageOfHIndexResult = await execQuery(averageOfHIndex);
    console.log(averageOfHIndexResult);

    const sumOfResearchPapersResult = await execQuery(sumOfResearchPapers);
    console.log(sumOfResearchPapersResult);

    const minAndMaxOfHIndexResult = await execQuery(minAndMaxOfHIndex);
    console.log(minAndMaxOfHIndexResult);

  } catch (error) {
    console.error(error);
    connection.end();
  }

  connection.end();
}

seedDatabase();
