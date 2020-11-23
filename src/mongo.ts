import * as mongoose from 'mongoose';
import * as dotenv from 'dotenv';

dotenv.config();

// DB Connection
const getConnection = async () => {
  try {
    const { MONGO_URI, MONGO_USER, MONGO_PW } = process.env;
    const option: mongoose.ConnectionOptions = {
      useNewUrlParser: true,
      useCreateIndex: true,
      user: MONGO_USER,
      pass: MONGO_PW,
    };
    await mongoose.connect(MONGO_URI, option);
    console.log('Connection to DB Successful');
  } catch (err) {
    console.log('Connection to DB Failed');
  }
};
export default getConnection;
