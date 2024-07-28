import mongoose from "mongoose";

const connectDB = async () => {
  const connectionState = mongoose.connection.readyState;

  if (connectionState === 1) {
    console.log("MongoDB is already connected.");
    return;
  }

  if (connectionState === 2) {
    console.log("MongoDB connection is currently in progress...");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000, // Timeout after 10 seconds
      connectTimeoutMS: 10000, // Connection timeout after 10 seconds
    });
    console.log("MongoDB connected successfully.");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    if (error.message.includes("ETIMEOUT")) {
      console.error(
        "The connection attempt timed out. This might be due to network issues or incorrect MongoDB URI."
      );
    }
    throw new Error("MongoDB connection failed");
  }
};

export default connectDB;

/*
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected");
  } catch (error) {
    throw new Error("MongoDB connection failed");
  }
  */

/*
   Best practice is to check the connection state before connecting to the database. This will prevent multiple connections to the database if the connection is already established or in progress. 
  */
