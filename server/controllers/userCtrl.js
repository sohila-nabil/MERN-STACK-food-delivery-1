import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

// login user
const loginUser = async (req, res) => {
    const { email, password } = req.body
   try {
     const user = await userModel.findOne({ email });
     if (!user) {
       return res.json({ success: false, msg: "User not exist" });
     }
     const isMatch = await bcrypt.compare(password, user.password);
     if (!isMatch) {
       return res.json({ success: false, msg: "invalid passowrd or email" });
     }
     const token = createToken(user._id);
     res.json({
       success: true,
       token,
     });
   } catch (error) {
     console.log(error);
     res.json({
       success: false,
       msg: "error",
     });
   }
};

// create token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_CESRET);
};

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userExist = await userModel.findOne({ email });
    if (userExist) {
      return res.json({ success: false, msg: "User already exist" });
    }
    if (!validator.isEmail(email)) {
      return res.json({ success: false, msg: "Please Enter a valid Email" });
    }
    if (password.length < 8) {
      return res.json({
        success: false,
        msg: "Please Enter a strong password",
      });
    }
    const salt =await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });
    const user = await newUser.save();
    const token = createToken(user._id);
    res.json({
      success: true,
      token,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      msg: "error",
    });
  }
};

export { loginUser, registerUser };
