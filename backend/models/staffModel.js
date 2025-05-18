import mongoose from "mongoose";

const staffSchema = mongoose.Schema(
  {
    name: { type: String },
    email: { type: String },
    phone: { type: String },
    role: { type: String },
    salary: { type: mongoose.Decimal128 },
    hireDate: { type: Date, default: Date.now },
    password: { type: String },
    isAdmin: { type: Boolean, default: false },
});

const Staff = mongoose.model("Staff", staffSchema, "staff");
export default Staff;
