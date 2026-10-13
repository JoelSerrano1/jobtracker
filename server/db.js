import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/jobtracker';

export async function connectDb() {
  if (mongoose.connection.readyState === 1) return mongoose.connection;
  await mongoose.connect(MONGO_URI, { serverSelectionTimeoutMS: 5000 });
  return mongoose.connection;
}

export default MONGO_URI;