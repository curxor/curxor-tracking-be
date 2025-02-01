import mongoose, { Connection } from "mongoose";
export default class MongoDBConnection {
  private static instance: Connection;
  private constructor() {}
  public static getInstance(): Connection {
    if (!MongoDBConnection.instance) {
      mongoose
        .connect(process.env.MONGODB_URI, { dbName: process.env.MONGODB_NAME })
        .then(() => console.log("Connected to MongoDB!"));
    }
    return MongoDBConnection.instance;
  }
}

