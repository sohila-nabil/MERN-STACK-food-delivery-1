import foodModel from "../models/foodModel.js";
import fs from "fs";
import express from "express";

// add food item
export const addFood = async (req, res) => {
  let imageFile = `${req.file.filename}`;
  let food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    image: imageFile,
    category: req.body.category,
  });
  try {
    await food.save();
    res.json({ success: true, msg: "Food Added Successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, msg: "error" });
  }
};

export const getAllFoods = async (req, res) => {
  try {
    const foodList = await foodModel.find({});
    res.json({ success: true, data: foodList });
  } catch (error) {
    console.log(error);
    res.json({ success: false, msg: "error" });
  }
};

export const removeFoodItem = async (req, res) => {
  try {
    let food = await foodModel.findById(req.body.id);
    fs.unlink(`uploads/${food?.image}`, () => {});

    await foodModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, msg: "Food Removed Successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, msg: "error" });
  }
};
