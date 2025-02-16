import express from 'express'
import { addToCart, getUserCart, removeFromCart } from '../controllers/cartControllers.js'
import authMiddleWare from '../middleware/authMiddleware.js'

const cartRouter = express.Router()

cartRouter.post("/cart/add", authMiddleWare, addToCart)
cartRouter.post("/cart/remove", authMiddleWare, removeFromCart)
cartRouter.post("/cart/get", authMiddleWare, getUserCart)

export default cartRouter