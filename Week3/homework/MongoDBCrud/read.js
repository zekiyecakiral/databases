const util = require("util");
const MongoClient = require("mongodb").MongoClient;
const url =
  "mongodb+srv://zekiye:zekiyeburak@hyf.463mg.mongodb.net/<dbname>?retryWrites=true&w=majority";

async function seedDatabase() {
  const client = new MongoClient(url);
  try {
    await client.connect();
    //finding by the city name,
    const filter = { Name: "Istanbul" };
    await client.db("hyf").collection("city").find(filter).toArray(function(err, results){
        console.log('Finding by city name');
        console.log(results); // output all records

    });

    //and then by the country code
    const filterCountryCode = { CountryCode: "TR" };
    await client.db("hyf").collection("city").find(filterCountryCode).toArray(function(err, result){
        console.log('Finding by country code');
        console.log(result);
    });
  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
}

seedDatabase();
