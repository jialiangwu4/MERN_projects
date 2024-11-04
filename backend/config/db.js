import mongoose from "mongoose"; //mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js.

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error){
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}