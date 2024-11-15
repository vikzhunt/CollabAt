import mongoose from "mongoose";
const URL =
  "mongodb+srv://thevikassingh9889:3gG6WoWajaFIgmLC@cluster.si93j.mongodb.net/?retryWrites=true&w=majority&appName=Cluster";
export async function db() {
  try {
    await mongoose.connect(URL);
    console.log("Connected to DB");
  } catch (error) {
    console.log(error);
  }
}

export default db;
