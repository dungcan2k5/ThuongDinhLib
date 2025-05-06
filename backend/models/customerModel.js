import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String },
        phone: { type: String },
        address: { type: String },
        membershipDate: { type: Date },
        password: { type: String },
    },
    {
        versionKey: false,
    }
);

const Customer = mongoose.model("Customers", customerSchema);

export default Customer;