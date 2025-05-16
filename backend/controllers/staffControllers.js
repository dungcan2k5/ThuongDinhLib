import asyncHandler from "express-async-handler";
import Staff from "../models/staffModel.js";
import { generateToken } from "../utils/generateToken.js";
import { hashPassword } from "../utils/hashPassword.js";
import bcrypt from "bcryptjs";

// @desc    Register a new staff
// @route   POST /api/staffs/register
export const registerStaff = asyncHandler(async (req, res) => {
    const userExists = await Staff.findOne({ email: req.body.email });
    if (userExists) {
        res.status(400).json({
            message: "Nhân viên đã tồn tại",
        });
        return;
    }

    const hashedPassword = await hashPassword(req.body.password);
    console.log('Password being saved:', hashedPassword);
    const staff = await Staff.create({
        ...req.body,
        password: hashedPassword
    });

    if (staff) {
        res.status(201).json({
            _id: staff._id,
            name: staff.name,
            email: staff.email,
            isAdmin: staff.isAdmin,
            token: generateToken(staff._id),
        });
    } else {
        res.status(400).json({
            message: "Tạo nhân viên thất bại",
        });
    }
});

// @desc    Login a staff
// @route   POST /api/staffs/login
export const loginStaff = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const staff = await Staff.findOne({ email });

    if (staff && await bcrypt.compare(password, staff.password)) {
        return res.json({
            status: "success",
            token: generateToken(staff._id),
            isAdmin: staff.isAdmin,
        });
    }

    res.status(401).json({ message: "Email hoặc mật khẩu không đúng" });
});

// @desc    Update staff profile
// @route   PUT /api/staffs/profile
// @access  Private
export const updateStaffProfile = asyncHandler(async (req, res) => {
    const staff = req.staff;
    if (staff) {
        staff.name = req.body.name || staff.name;
        staff.email = req.body.email || staff.email;
        staff.phone = req.body.phone || staff.phone;
        staff.address = req.body.address || staff.address;
        staff.position = req.body.position || staff.position;
        staff.password = req.body.password ? await hashPassword(req.body.password) : staff.password;

        await staff.save();
        res.json({
            message: "Cập nhật thông tin thành công",
        });
    } else {
        res.status(404).json({
            message: "Không tìm thấy nhân viên",
        });
    }
});

// @desc    Get staff profile
// @route   GET /api/staffs/profile
// @access  Private
export const getStaffProfile = asyncHandler(async (req, res) => {
    const staff = req.staff;
    res.json(staff);
});

// @desc    Delete staff
// @route   DELETE /api/staffs/profile
// @access  Private/Admin
export const deleteStaffProfile = asyncHandler(async (req, res) => {
    const staffToDelete = await Staff.findById(req.params.id);
    
    if (!staffToDelete) {
        res.status(404).json({
            message: "Không tìm thấy nhân viên",
        });
        return;
    }

    // Check if trying to delete an admin
    if (staffToDelete.isAdmin) {
        res.status(403).json({
            message: "Không thể xóa tài khoản admin khác",
        });
        return;
    }

    await Staff.deleteOne({ _id: staffToDelete._id });
    res.json({
        message: "Xóa nhân viên thành công",
    });
});

// @desc    Get all staffs
// @route   GET /api/staffs
// @access  Private/Admin
export const getAllStaffs = asyncHandler(async (req, res) => {
    const staffs = await Staff.find({}).select("-password");
    res.json(staffs);
});
