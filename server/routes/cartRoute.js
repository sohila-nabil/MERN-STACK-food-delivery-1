import {
  addToCart,
  removeFromCart,
  getCartData,
} from "../controllers/cartCtrl.js";
import express from "express";
import authMiddleware from "../middleware/auth.js";
const cartRouter = express.Router()

cartRouter.post("/add-to-cart", authMiddleware, addToCart);
cartRouter.post("/get-cart",authMiddleware, getCartData)
cartRouter.post("/remove-cart", authMiddleware,removeFromCart);

export default cartRouter