import mongoose from "mongoose"

let isConnected: boolean = false

export const connectToDB = async () => {
  mongoose.set("strictQuery", true)
  if (isConnected) {
    console.log("MongoDB is already connected")
    return
  }
  try {
    await mongoose.connect(process.env.DATABASE_URL as string)
    isConnected = true
    console.log("Mongo is connected")
  } catch (error) {
    console.log(error)
  }
}
