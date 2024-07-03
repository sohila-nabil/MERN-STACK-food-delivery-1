import userModel from "../models/userModel.js";

// Add to Cart
const addToCart = async (req, res) => {
  try {
    let user = await userModel.findById({ _id: req.body.userId });
    let cartData = await user.cartData;
    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({ success: true, mse: "Added to Cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, mse: "Error" });
  }
};
const removeFromCart = async (req, res) => {
  try {
    let user = await userModel.findOne({ _id: req.body.userId });
    let cartData = await user.cartData;
    if (cartData[req.body.itemId]) {
      cartData[req.body.itemId] -= 1;
    }
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({ success: true, mse: "Removed from Cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, mse: "Error" });
  }
};
const getCartData = async (req, res) => {
  try {
    let user = await userModel.findOne({ _id: req.body.userId });
    let cartData = await user.cartData;
    res.json({ success: true, cartData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, mse: "Error" });
  }
};

export { addToCart, removeFromCart, getCartData };
