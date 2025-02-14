import mongoose from 'mongoose'

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_DB).then(() => console.log("DB Connected"))
}

export default connectDB