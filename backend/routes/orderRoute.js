import express from 'express'
import authMiddleWare from '../middleware/authMiddleware.js'
import { placeOrder, verifyOrder, userOrders, listOrders, updateStatus } from '../controllers/orderControllers.js'
const orderRouter = express.Router()

orderRouter.post("/place", authMiddleWare, placeOrder)
orderRouter.post("/verify", verifyOrder)
orderRouter.post("/userorders", authMiddleWare, userOrders)
orderRouter.get("/list", listOrders)
orderRouter.post("/status", updateStatus)

export default orderRouter