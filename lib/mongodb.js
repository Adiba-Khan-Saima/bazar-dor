import dns from "node:dns";
import { promises as dnsPromises } from "node:dns";

dns.setServers([
  "1.1.1.1",
  "8.8.8.8",
]);

dnsPromises.setServers([
  "1.1.1.1",
  "8.8.8.8",
]);

const { MongoClient } = await import("mongodb");

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error(
    "Please add MONGODB_URI to your .env.local file"
  );
}

const client = new MongoClient(uri);

let clientPromise;

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    global._mongoClientPromise =
      client.connect();
  }

  clientPromise =
    global._mongoClientPromise;
} else {
  clientPromise =
    client.connect();
}

export default clientPromise;