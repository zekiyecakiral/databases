const util = require("util");
const MongoClient = require("mongodb").MongoClient;
const url =
  "mongodb+srv://zekiye:zekiyeburak@hyf.463mg.mongodb.net/<dbname>?retryWrites=true&w=majority";

async function seedDatabase() {
  const client = new MongoClient(url);
  try {
    await client.connect();

    const filter = { Name: "Istanbul" };
    await client.db("hyf").collection("city").deleteOne(filter).then(data=>console.log(`${filter.Name} is deleted!`));
  
} catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
}

seedDatabase();
