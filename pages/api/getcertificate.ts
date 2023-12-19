import clientPromise from "../../config/mongodb";

async function handleRequest(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("v3rify");

    const cert = await db.collection("certificate").find({}).limit(20).toArray();

    res.json(cert);
  } catch (e) {
    console.error(e);
    throw new Error(e).message;
  }
};

export default handleRequest;