import mongoose from "mongoose";

export const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('database connected successfully ✅')
    } catch (error) {
        console.error('failed to connect database ❌', error)
        process.exit(1)
    }
}