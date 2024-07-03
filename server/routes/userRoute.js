import { loginUser, registerUser } from "../controllers/userCtrl.js";
import express from "express"
import multer from "multer";
const userRouter = express.Router()

userRouter.post("/register", registerUser)
userRouter.post("/login", loginUser);


export default userRouter;