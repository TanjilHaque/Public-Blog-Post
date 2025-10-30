const mongoose = require("mongoose");
const { DB_NAME } = require("../constants/constants");
require("dotenv").config();

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URL}/${DB_NAME}`
    );
    console.log(
      `✅ MongoDB connected successfully! Host: ${connectionInstance.connection.host}`
    );
    return connectionInstance;
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = { connectDB };
