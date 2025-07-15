import mongoose from 'mongoose';

let isConnected = false;

const connectToMongo = async () => {
  if (isConnected) return;

  const MONGO_URI = process.env.MONGO_URI; // 
  if (!MONGO_URI) {
    throw new Error('MONGO_URI is not defined in environment variables');
  }

  try {
    const conn = await mongoose.connect(MONGO_URI, {
      dbName: 'gratitude-journal',
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = true;
    console.log('✅ MongoDB connected:', conn.connection.host);
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    throw err;
  }
};

export default connectToMongo;
