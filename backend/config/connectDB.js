import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_DB).then(() => console.log("DB Connected"))
}

export default connectDB