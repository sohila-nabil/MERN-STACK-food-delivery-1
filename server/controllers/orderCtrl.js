import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(
  "sk_test_51PY5rARoZ5nfqHeJEw7Hklv3Kq6OOAToT4zZuozIdrRWEgn36HulmKhhmDQaNYgovsjvFaXnDJntmbCNSt6necGE00zk33NwAM"
);

const placeOrder = async (req, res) => {
  const frontendUrl = "http://localhost:3001";
  try {
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });
    await newOrder.save();
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100 * 80,
      },
      quantity: item.quantity,
    }));
    line_items.push({
      price_data: {
        currency: "usd",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: 2 * 100 * 80,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: "payment",
      success_url: `${frontendUrl}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontendUrl}/verify?success=false&orderId=${newOrder._id}`,
    });
    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.log(error);
    res.json({ success: false, msg: "error" });
  }
};

const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;
  try {
    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      res.json({ success: true, msg: "Paid" });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false, msg: "Not Paid" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, msg: "Error" });
  }
};

const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.body.userId });
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, msg: "Error" });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: true, msg: "error" });
  }
};

// updating order status
const updateStauts = async (req, res) => {
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId, {
      statues: req.body.statues,
    });
    res.json({ success: true, msg: "Status Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: true, msg: "error" });
  }
};

export { placeOrder, verifyOrder, userOrders, getAllOrders, updateStauts };
