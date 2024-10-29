// types/connection.ts
import type { Mongoose } from 'mongoose';

export interface GlobalMongoose {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

// Add this to handle global augmentation
declare global {
  // eslint-disable-next-line no-var
  var mongoose:
    | { conn: Mongoose | null; promise: Promise<Mongoose> | null }
    | undefined;
}

import mongoose from 'mongoose';
// lib/mongoose.ts
// import type { Mongoose } from 'mongoose';
// import type { GlobalMongoose } from '@/types/connection';

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env'
  );
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached: GlobalMongoose = (global as any).mongoose ?? {
  conn: null,
  promise: null,
};

if (!(global as any).mongoose) {
  (global as any).mongoose = {
    conn: null,
    promise: null,
  };
}

async function connection(): Promise<Mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      family: 4,
    } as const;

    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongoose) => {
        return mongoose;
      })
      .catch((error) => {
        console.error('MongoDB connection error:', error);
        cached.promise = null;
        throw error;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connection;
// import mongoose, { Mongoose } from 'mongoose';

// // types
// import { GlobalMongoose } from '@/types/connection';
// declare global {
//   var mongoose: GlobalMongoose | undefined;
// }

// const MONGODB_URI: string = process.env.MONGODB_URI!;

// if (!MONGODB_URI) {
//   throw new Error(
//     'Please define the MONGODB_URI environment variable inside .env'
//   );
// }

// let cached: GlobalMongoose = global.mongoose || { conn: null, promise: null };

// if (!cached) {
//   cached = global.mongoose = { conn: null, promise: null };
// }

// async function connection(): Promise<Mongoose> {
//   if (cached.conn) {
//     return cached.conn;
//   }

//   if (!cached.promise) {
//     const opts = {
//       bufferCommands: false,
//     };

//     cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
//       return mongoose;
//     });
//   }

//   try {
//     cached.conn = await cached.promise;
//   } catch (e) {
//     cached.promise = null;
//     throw e;
//   }

//   return cached.conn;
// }

// export default connection;
