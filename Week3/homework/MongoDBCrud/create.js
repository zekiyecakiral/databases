const util = require("util");
const MongoClient = require("mongodb").MongoClient;
const url =
  "mongodb+srv://zekiye:zekiyeburak@hyf.463mg.mongodb.net/<dbname>?retryWrites=true&w=majority";

async function seedDatabase() {
  const client = new MongoClient(url);
  try {
    await client.connect();
    const city = {
      ID: 4080,
      Name: "Istanbul",
      CountryCode: "TR",
      District: "Marmara",
      Population: 101853,
    };
    await client
      .db("hyf")
      .collection("city")
      .insertOne(city)
      .then((data) => console.log(`${data.ops[0].Name} is inserted`));
  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
}

seedDatabase();
