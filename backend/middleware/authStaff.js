import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import Staff from "../models/staffModel.js";

export const protect = asyncHandler(async (req, res, next) => {
    let token;
    if (req.headers.authorization?.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.staff = await Staff.findById(decoded.id).select("-password");
            next();
        } catch (error) {
            res.status(401).json({
                message: "Not authorized, token failed",
            });
        }
    }
    if (!token) {
        res.status(401).json({
            message: "Not authorized, no token",
        });
    }
});

export const admin = (req, res, next) => {
    if (req.staff && req.staff.isAdmin) {
        next();
    } else {
        res.status(401).json({
            message: "Not authorized as an admin",
        });
    }
};
