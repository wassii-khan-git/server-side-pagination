import mongoose from "mongoose";

export default async function DatabaseConnection() {
  try {
    const connection = await mongoose.connect(
      process.env.NEXT_DB_URL as string
    );
    if (!connection) {
      throw new Error("Failed to connect to the database");
    }
    console.log("Connected to MongoDB database successfully");
  } catch (error) {
    console.log("Error connecting to MongoDB database:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
}
