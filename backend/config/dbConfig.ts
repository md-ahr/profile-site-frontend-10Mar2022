import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const MONGODB_URI: string | undefined = process.env.MONGODB_URI;

const connectDB = async (): Promise<void> => {
    try {
        const conn = await mongoose.connect(`${MONGODB_URI}`);
        console.log(`MongoDB connected successfully on ${conn.connection.host}`);
    } catch (error) {
        console.log('Failed to connect to MongoDB', error);
    }
};

export default connectDB;
