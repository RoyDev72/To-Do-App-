import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const uri = process.env.MONGODB_URI;
        if (!uri) throw new Error('MONGODB_URI not set in environment');
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log(`MongoDB connected: ${mongoose.connection.host}`);
    } catch (error) {
        console.error("MongoDB connection failed:", error);
        // do not exit here; let caller decide — helpful while debugging
        throw error;
    }
};