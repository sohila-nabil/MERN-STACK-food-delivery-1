import express from "express";
import cors from "cors";
import { dbConnection } from "./config/dbConnection.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js";

import "dotenv/config.js"
// app config
const app = express();
const port = 4000;

// db connection
dbConnection();

// middleware
app.use(express.json());
app.use(cors());
app.use("/api/food", foodRouter)
app.use("/images", express.static("uploads"))
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.listen(port, () => {
  console.log(`SERVER WORKIN on ${port}`);
});
