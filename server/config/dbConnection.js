import mongoose from "mongoose";

export const dbConnection = async () => {
  await mongoose.connect("mongodb://127.0.0.1:27017/food-del").then(() => {
    console.log("db successfully connected");
  });
};
