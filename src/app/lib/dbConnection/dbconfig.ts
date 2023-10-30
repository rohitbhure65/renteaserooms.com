import mongoose from "mongoose";

  const connect = async () => {
    try {
      await mongoose.connect(process.env.MONGO_KEY!);
      console.log('MongoDB connected');
    } catch (error) {
      console.error('MongoDB connection error:', error);
    }
  };


export default connect;