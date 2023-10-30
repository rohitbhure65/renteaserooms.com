import mongoose from "mongoose";

// const connect = async () => {
  //   try {
  //     await mongoose.connect(process.env.MONGO_URL!);
  //     const connection = mongoose.connection
      
  //     connection.on('Connected',()=>{
  //       console.log('MongoDB Connected Successfully')
  //     })

  //     connection.on('error',(err)=>{
  //     console.log('MongoDB Connection Error. Please make sure MongoDB is running .' + err);
  //     process.exit();
  //     })

  //   } catch (error) {
  //     console.error('Somthing goes wrong!', error);
  //   }
  // };
  
  const connect = async () => {
    try {
      await mongoose.create(process.env.MONGO!);
      console.log('MongoDB connected');
    } catch (error) {
      console.error('MongoDB connection error:', error);
    }
  };

export default connect;