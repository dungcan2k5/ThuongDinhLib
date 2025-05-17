import express from "express";
import {
    registerStaff,
    loginStaff,
    updateStaffProfile,
    getStaffProfile,
    deleteStaffProfile,
    getAllStaffs,
} from "../controllers/staffControllers.js";
import { protect, admin } from "../middleware/authStaff.js";

const router = express.Router();

router.route("/register").post(protect, admin, registerStaff);
router.route("/login").post(loginStaff);
router.route("/profile")
    .get(protect, getStaffProfile)
    .put(protect, updateStaffProfile);
router.route("/:id").delete(protect, admin, deleteStaffProfile);
router.route("/").get(protect, admin, getAllStaffs);

export default router;
