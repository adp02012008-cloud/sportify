import mongoose from 'mongoose';

let isConnected = false;
let memoryStoreMode = false;

export const connectDB = async (): Promise<void> => {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/soundwave';
  try {
    // Attempt Mongoose connection with a quick timeout (1.5s)
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 1500,
    });
    isConnected = true;
    memoryStoreMode = false;
    console.log('✅ Connected to MongoDB at:', uri);
  } catch (error) {
    memoryStoreMode = true;
    console.warn('⚠️ MongoDB server not reachable. Activating High-Performance In-Memory Data Store.');
    console.log('⚡ All models, queries, aggregations, auth and CRUD will operate seamlessly in-memory.');
  }
};

export const isMemoryMode = (): boolean => memoryStoreMode;
