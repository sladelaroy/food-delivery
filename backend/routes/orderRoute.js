import express from 'express'
import authMiddleWare from '../middleware/authMiddleware.js'
import { placeOrder } from '../controllers/orderControllers.js'
const orderRouter = express.Router()

orderRouter.post("/place", authMiddleWare, placeOrder)

export default orderRouter