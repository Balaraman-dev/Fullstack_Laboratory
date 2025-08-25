import mongoose from "mongoose"; 

const connectDB = async () => {
    const MONGODB_URI = "mongodb://127.0.0.1:27017/fswd";

  try {
  await mongoose.connect(MONGODB_URI,
  {
      serverSelectionTimeoutMS: 10000, 
      socketTimeoutMS: 45000,
  }
  );
    console.log("MongoDB Connected"); 
  } catch (error) {
    console.error("MongoDB Connection Failed:",error, error.message); 
    process.exit(1);
  }
};


export default connectDB;