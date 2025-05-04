import jwt from "jsonwebtoken";
import User from "../models/customerModel.js";

export const protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.authorization.split(" ")[1];
            
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.cus = await User.findById(decoded.id).select("-password");

            next();
        } catch (error) {
            res.status(401).json({
                message: "Token không hợp lệ, không được truy cập",
            });
        }
    }

    if (!token) {
        res.status(401).json({
            message: "Không có token, không được truy cập",
        });
    }
};
