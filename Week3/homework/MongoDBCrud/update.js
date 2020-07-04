const util = require("util");
const MongoClient = require("mongodb").MongoClient;
const url =
  "mongodb+srv://zekiye:zekiyeburak@hyf.463mg.mongodb.net/<dbname>?retryWrites=true&w=majority";

async function seedDatabase() {

  const client = new MongoClient(url);
  
  try {
    await client.connect();

    const filter = { ID: 4080 };
    const update = { $set: { Population: 101860 } };

    await client
      .db("hyf")
      .collection("city")
      .updateOne(filter, update, function (err, res) {
        if (err) throw err;
        console.log("Successfully updated the population of city");
      });
      
  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
}

seedDatabase();
