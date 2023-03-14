import mongoose from "mongoose";
import dataConfig from "./params.cfg";

const dbConnection = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGODB_CNN as string, dataConfig);
    console.log("Database online");
  } catch (error) {
    throw new Error("Error on DB connection.");
  }
};

export default dbConnection;
