import * as mongoose from "mongoose";
import { config } from "./app.config";
class Database {
  async connect(callback: () => void) {
    const connectStr = config.mongodb.dbURI;
    console.log("Trying to connect to database..");
    mongoose
      .connect(connectStr)
      .then(() => {
        console.log("Successfully connected to database");
      })
      .catch((ex) => {
        console.log("Database connection failed, exiting now...");
        console.error(ex);
        process.exit(1);
      });
    mongoose.connection.once("open", () => {
      callback();
      console.log(`Database opened: ${connectStr}`);
    });
    mongoose.connection.on("error", () => {
      throw new Error(`unable to connect to database: ${connectStr}`);
    });
    mongoose.connection.on("disconnected", () => {
      console.log(`Disconnected to database: ${connectStr}`);
    });
  }
}
export const database = new Database();
