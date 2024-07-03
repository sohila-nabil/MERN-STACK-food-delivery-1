import {
  addFood,
  getAllFoods,
  removeFoodItem,
} from "../controllers/foodCtrl.js";
import express from "express"
import multer from "multer";
const foodRouter = express.Router()

const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
})

const upload = multer({storage:storage})

foodRouter.post("/add", upload.single("image"), addFood);
foodRouter.get("/foodList", getAllFoods);
foodRouter.post("/delete", removeFoodItem);

export default foodRouter;