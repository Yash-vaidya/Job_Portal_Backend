import jwt from "jsonwebtoken";
const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        Message: "user is not authenticated",
        success: false,
      });
    }

    const decode = await jwt.verify(token, process.env.SECRET_KEY);
    if (!decode) {
      return res.status(401).json({
        Message: "invalid token",
        success: false,
      });
    }

    req.id = decode.userId;
    next();
  } catch (err) {
    console.log(err);
  }
};
export default isAuthenticated;
