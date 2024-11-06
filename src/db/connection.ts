// lib/dbConnect.ts
import mongoose from 'mongoose';
import { registerModels } from './models';

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

interface GlobalMongoose {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongoose: GlobalMongoose | undefined;
}

let cached = global.mongoose || { conn: null, promise: null };

if (!global.mongoose) {
  global.mongoose = cached;
}

async function connection() {
  try {
    if (cached.conn) {
      if (mongoose.connection.readyState === 1) {
        return cached.conn;
      }
      await mongoose.connection.close();
      cached.conn = null;
    }

    if (!cached.promise) {
      const opts = {
        bufferCommands: false,
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
        family: 4,
      };

      cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
        console.log('New MongoDB connection established');
        registerModels();
        return mongoose;
      });
    }

    try {
      cached.conn = await cached.promise;
    } catch (e) {
      cached.promise = null;
      throw e;
    }

    return cached.conn;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

// Helper to ensure connection is ready
export async function ensureConnection() {
  try {
    const conn = await connection();
    if (conn.connection.readyState !== 1) {
      throw new Error('Database connection not ready');
    }
    return conn;
  } catch (error) {
    console.error('Failed to ensure database connection:', error);
    throw error;
  }
}

export default connection;
