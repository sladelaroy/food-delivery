import express from 'express'
import { addToCart, getUserCart, removeFromCart } from '../controllers/cartControllers.js'
import authMiddleWare from '../middleware/authMiddleware.js'

const cartRouter = express.Router()

cartRouter.post("/add", authMiddleWare, addToCart)
cartRouter.post("/remove", authMiddleWare, removeFromCart)
cartRouter.post("/get", authMiddleWare, getUserCart)

export default cartRouter