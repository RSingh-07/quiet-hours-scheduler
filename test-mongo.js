import { MongoClient } from "mongodb";

const uri = "mongodb+srv://537riya:Riya%40123@clusterriya.pnhidjo.mongodb.net/studyScheduler?retryWrites=true&w=majority&authSource=admin";

async function main() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    console.log("✅ Connected!");
    const db = client.db("studyScheduler");
    const collections = await db.listCollections().toArray();
    console.log("Collections:", collections.map(c => c.name));
  } catch (err) {
    console.error("❌ Connection error:", err);
  } finally {
    await client.close();
  }
}

main();
