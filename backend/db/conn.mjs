import { MongoClient, ServerApiVersion } from "mongodb";
import "../loadEnvironment.mjs";

const URI = process.env.ATLAS_URI;

const client = new MongoClient(URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let database;

export async function connectToDatabase() {
  try {
    await client.connect();

    database = client.db("employees");

    console.log("Connected successfully to MongoDB Atlas");
  } catch (error) {
    console.error(error);
    process.exit();
  }
}

export function getDb() {
  return database;
}