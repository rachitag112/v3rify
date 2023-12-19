// import mongoose from 'mongoose';

// export const connectDB = async () => {
//     try {
//         const { connection } = await mongoose.connect(process.env.MONGODB_URI, {
//         });
//         console.log('MongoDB connected');
//     } catch (err) {
//         console.log("Error connecting to MongoDB");
//         console.error(err.message);
//         // process.exit(1);
//     }
// }

import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI
const options = {}

let client
let clientPromise: Promise<MongoClient>

client = new MongoClient(uri, options)
clientPromise = client.connect()
  
  // Export a module-scoped MongoClient promise. By doing this in a
  // separate module, the client can be shared across functions.
export default clientPromise