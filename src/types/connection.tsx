import mongoose, { Mongoose } from 'mongoose';

// ts
export interface GlobalMongoose {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

// ts
