import mongoose from "mongoose";

const connectDB = async () => {
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

  const connectionState = mongoose.connection.readyState;
  if (connectionState === 1) {
    console.log("Already connected");
    return;
  } 
  if (connectionState === 2) {
    console.log("Connecting...");
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.log("Error connecting to Database", error.message);
    throw new Error("MongoDB connection failed");
  }
};

export default connectDB;