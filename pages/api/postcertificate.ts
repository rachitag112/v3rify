import clientPromise from "../../config/mongodb";

async function handleRequest(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("v3rify");
    const {
      ownerAddress,
      aadhaarNumber,
      certificateTitle,
      certificateDescription,
      status,
      documentType,
      verifierAddress,
    } = req.body;

    const cert = await db.collection("certificate").insertOne({
      ownerAddress,
      aadhaarNumber,
      certificateTitle,
      certificateDescription,
      status,
      documentType,
      verifierAddress,
    });

    res.json(cert);
  } catch (e) {
    console.error(e);
    throw new Error(e).message;
  }
}

export default handleRequest;
