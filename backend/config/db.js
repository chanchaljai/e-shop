import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("mongoose connect successfully");
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
};

export default connectDB;