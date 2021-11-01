import mongoose from 'mongoose';

const connectDB = async () => {
  const MONGO_URL = process.env.MONGO_URL|| 'mongodb://localhost:/mushfiq'

  try {
    const connect = await mongoose.connect(MONGO_URL, {
      // useCreateIndex: true,
      // useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${connect.connection.host}`);
  } catch (err) {
    console.error(`Error ${err}`);
    process.exit(1);
  }
};

export default connectDB;
