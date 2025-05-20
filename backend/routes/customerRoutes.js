import express from "express";
import {
    getCustomerProfile,
    registerCustomer,
    loginCustomer,
    updateCustomerProfile,
    deleteCustomerProfile,
    getAllCustomers
} from "../controllers/customerControllers.js";
import { protect } from "../middlewares/authCustomerMiddleware.js";

const router = express.Router();

//GET /api/customers
router.get("/", protect, getAllCustomers);

// GET /api/customers/profile
router.get("/profile", protect, getCustomerProfile);

// POST /api/customers/register
router.post("/register", registerCustomer);

// POST /api/customers/login
router.post("/login", loginCustomer);

// PUT /api/customers/profile
router.put("/profile", protect, updateCustomerProfile);

// DELETE /api/customers/profile
router.delete("/profile", protect, deleteCustomerProfile);
export default router;
