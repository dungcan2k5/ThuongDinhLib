import asyncHandler from "express-async-handler";
import Customer from "../models/customerModel.js";
import { generateToken } from "../utils/generateToken.js";
import { hashPassword } from "../utils/hashPassword.js";
import bcrypt from "bcryptjs";

// @desc    Register a new customer
// @route   POST /api/customers/register
export const registerCustomer = asyncHandler(async (req, res) => {
    const userExists = await Customer.findOne({ email: req.body.email });
    if (userExists) {
        res.status(400).json({
            message: "Customer đã tồn tại",
        });
        return;
    }

    const hashedPassword = await hashPassword(req.body.password);
    const cus = await Customer.create({
        ...req.body,
        password: hashedPassword
    });

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

    if (cus && await bcrypt.compare(password, cus.password)) {
        return res.json({
            status: "success",
            token: generateToken(cus._id),
        });
    }

    res.status(401).json({ message: "Email hoặc mật khẩu không đúng" });
});

// @desc    Update customer profile
// @route   PUT /api/customers/profile
// @access  Private
export const updateCustomerProfile = asyncHandler(async (req, res) => {
    const customer = await Customer.findById(req.cus._id).select('+password');
    if (!customer) {
      return res.status(404).json({ message: 'Không tìm thấy người dùng' });
    }
  
    // Nếu có yêu cầu đổi mật khẩu thì kiểm tra mật khẩu hiện tại
    if (req.body.newPassword) {
      const currentPassword = (req.body.currentPassword || '').trim();
  
      if (!currentPassword) {
        return res.status(400).json({ message: 'Vui lòng nhập mật khẩu hiện tại' });
      }
  
      const isMatch = await bcrypt.compare(currentPassword, customer.password);
  
      if (!isMatch) {
        return res.status(400).json({ message: 'Mật khẩu hiện tại không đúng' });
      }
  
      const salt = await bcrypt.genSalt(10);
      customer.password = await bcrypt.hash(req.body.newPassword, salt);
    }
  
    // Cập nhật các thông tin khác
    if (req.body.name) customer.name = req.body.name.trim();
    if (req.body.phone) customer.phone = req.body.phone.trim();
    if (req.body.address) customer.address = req.body.address.trim();
  
    await customer.save();
  
    res.status(200).json({ message: 'Cập nhật thông tin thành công' });
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

// @desc    Get all customers
// @route   GET /api/customers
// @access  Private/Admin
export const getAllCustomers = asyncHandler(async (req, res) => {
    const customers = await Customer.find({}).select("-password");
    res.json(customers);
});