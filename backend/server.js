import express from 'express'
import cors from 'cors'
import {config} from 'dotenv'
import connectDB from './config/connectDB.js'
import foodRouter from './routes/foodRoute.js'
import userRouter from './routes/userRoute.js'

config()
const port = process.env.PORT

const app = express()

app.use(express.json())
app.use(cors())
connectDB()

app.get("/", (req, res) => {
  res.send("API WORKING😎")
})

app.use("/api/food", foodRouter)
app.use("/api/user", userRouter)
app.use("/images", express.static('uploads'))

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
