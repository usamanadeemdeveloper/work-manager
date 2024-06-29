
import { User } from "@/model/user";
import mongoose from "mongoose";

export const connectDb = async () => {
    try {
        const mongoDbUrl = process.env.MONGO_DB_URL;
        if (mongoDbUrl) {
            const { connection } = await mongoose.connect(mongoDbUrl, {
                dbName: 'work_manager',
            });
            console.log("MongoDB Connected: ", connection.host, connection.name);
        } else {
            throw new Error("MongoDB URL not found in environment variables");
        }
    } catch (error) {
        console.log("MongoDB Connection Failed");
        console.error(error);
    }
};
