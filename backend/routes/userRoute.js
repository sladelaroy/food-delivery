import express from 'express'
import { loginUser, registerUser } from '../controllers/userControllers.js'


const foodRouter = express.Router()

foodRouter.post("/register", registerUser)
foodRouter.post("/login", loginUser)

export default foodRouter