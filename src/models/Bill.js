import mongoose from "mongoose";

const BillSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  date: { type: String },
  billPeriod: { type: String },
  billFrom: { type: String, required: true },
  billAmount: { type: String, required: true },
  billDueDate: { type: String, required: true },
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "medium",
  },
  remarks: { type: String },
  isPaid: { type: Boolean, default: false },
  paymentDate: { type: String },
  paymentAmount: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Bill || mongoose.model("Bill", BillSchema);
