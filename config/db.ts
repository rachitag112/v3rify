import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        const { connection } = await mongoose.connect(process.env.MONGODB_URI, {
        });
        console.log('MongoDB connected');
    } catch (err) {
        console.log("Error connecting to MongoDB");
        console.error(err.message);
        // process.exit(1);
    }
}