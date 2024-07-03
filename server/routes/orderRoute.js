import {
  placeOrder,
  verifyOrder,
  userOrders,
  getAllOrders,
  updateStauts,
} from "../controllers/orderCtrl.js";
import authMiddleware from "../middleware/auth.js";
import express from "express";
const orderRouter = express.Router();

orderRouter.post("/place", authMiddleware, placeOrder);
orderRouter.post("/verify", verifyOrder);
orderRouter.post("/user-orders", authMiddleware, userOrders);
orderRouter.get("/all-orders", getAllOrders);
orderRouter.post("/status", updateStauts);
export default orderRouter;
