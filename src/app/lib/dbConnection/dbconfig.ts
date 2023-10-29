const mongoose = require('mongoose');

const dbURL = process.env.MONGO_KEY;

const connectDB = async () => {
    try {
      await mongoose.connect(dbURL, {
        useNewUrlParser: true,
        useCreateIndex: true,
  
    });
      console.log('MongoDB connected');
    } catch (error) {
      console.error('MongoDB connection error:', error);
    }
  };
  
const dbConnection = connectDB;
export default dbConnection;