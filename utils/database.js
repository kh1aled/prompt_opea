import mongoose from "mongoose";

let isConnected = false; 

const connectToDB = async () => {
  if (isConnected) {
    console.log("MongoDB is already connected.");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "share_prompt", 
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = true;
    console.log("Connected to MongoDB.");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

export default connectToDB;
