import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return res.json({ success: false, msg: "not authenticated" });
  }
  try {
    const token_decode = jwt.verify(token, process.env.JWT_CESRET);
    req.body.userId = token_decode.id;
    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, msg: "error" });
  }
};

export default authMiddleware;
