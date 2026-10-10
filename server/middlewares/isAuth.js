import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const isAuth = async (req, res, next) => {
    try {
        const token = req.cookies?.token;

        if (!token) {
            return res.status(401).json({
                message: "Token not found. Please login again."
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(401).json({
                message: "User not found. Please login again."
            });
        }

        req.user = user;

        next();
    } catch (error) {
        console.error("AUTH ERROR:", error.message);

        return res.status(401).json({
            message: "Invalid or expired token. Please login again."
        });
    }
};

export default isAuth;