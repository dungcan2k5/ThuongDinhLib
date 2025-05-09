import asyncHandler from "express-async-handler";
import Customer from "../models/customerModel.js";
import { generateToken } from "../utils/generateToken.js";
import e from "express";

// @desc    Register a new customer
// @route   POST /api/customers/register
export const registerCustomer = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const userExists = await Customer.findOne({ email });
    if (userExists) {
        res.status(400).json({
            message: "Customer đã tồn tại",
        });
        return;
    }

    const cus = await Customer.create(req.body);
    
    if (cus) {
        res.status(201).json({
            _id: cus._id,
            name: cus.name,
            email: cus.email,
            token: generateToken(cus._id),
        });
    } else {
        res.status(400).json({
            message: "Tạo customter thất bại",
        });
    }
});

// @desc    Login a customer
// @route   POST /api/customers/login
export const loginCustomer = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const cus = await Customer.findOne({ email });

    if (cus && cus.password == password) {
        res.json({
            status: "success",
            token: generateToken(cus._id),
        });
    } else {
        res.status(401).json({
            message: "Email hoặc mật khẩu không đúng",
        });
    }
});

// @desc    Update customer profile
// @route   PUT /api/customers/profile
// @access  Private
export const updateCustomerProfile = asyncHandler(async (req, res) => {
    const cus = req.cus;
    if (cus) {
        cus.name = req.body.name || cus.name;
        cus.email = req.body.email || cus.email;
        cus.phone = req.body.phone || cus.phone;
        cus.address = req.body.address || cus.address;
        cus.membershipDate = req.body.membershipDate || cus.membershipDate;
        cus.password = req.body.password || cus.password;

        await cus.save();
        res.json({
            message: "Cập nhật thông tin thành công",
        });
    } else {
        res.status(404).json({
            message: "Không tìm thấy customer",
        });
    }
});

// @desc    Get customer profile
// @route   GET /api/customers/profile
// @access  Private
export const getCustomerProfile = asyncHandler(async (req, res) => {
    const cus = req.cus;
    res.json(cus);
});


// @desc    Delete customer profile
// @route   DELETE /api/customers/profile
// @access  Private
export const deleteCustomerProfile = asyncHandler(async (req, res) => {
    const cus = req.cus;
    if (cus) {
        await Customer.deleteOne({ _id: cus._id });
        res.json({
            message: "Xóa customer thành công",
        });
    } else {
        res.status(404).json({
            message: "Không tìm thấy customer",
        });
    }
});