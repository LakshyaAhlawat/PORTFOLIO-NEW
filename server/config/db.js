const mongoose=require('mongoose');
const dotenv=require('dotenv');
dotenv.config();

const connectDB=async()=>{
  try{
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully");
  }
  catch(error){
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit the process with failure
  }
}
module.exports=connectDB;
// This code connects to a MongoDB database using Mongoose.
// It reads the connection string from an environment variable and handles errors during the connection process.