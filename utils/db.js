// utils/db.js
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export default async function connectDB() {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.error("MONGO_URI not found in .env");
    process.exit(1);
  }

  try {
    await mongoose.connect(uri, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });

    console.log("✅ MongoDB connected");

    console.log("Mongoose readyState:", mongoose.connection.readyState);
    console.log(
      "Connection host(s):",
      mongoose.connection.hosts || mongoose.connection.name
    );
  } catch (err) {
    console.error("❌ MongoDB connection error:");
    console.error(err);
    if (err?.reason) {
      console.error("Topology reason:", err.reason);
    }
    process.exit(1);
  }
}
