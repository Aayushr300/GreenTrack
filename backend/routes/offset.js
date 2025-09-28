import mongoose from "mongoose";

const offsetSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    }, // USD
    carbonAmount: {
      type: Number,
      required: true,
    }, // kg CO2
    paymentId: {
      type: String,
      required: true,
    }, // Stripe/PayPal ID
    status: {
      type: String,
      enum: ["pending", "completed", "failed", "refunded"],
      default: "pending",
    },
    project: {
      type: String,
      default: "Renewable Energy Project",
    }, // offset project name
    paymentMethod: String,
    currency: {
      type: String,
      default: "USD",
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
offsetSchema.index({ userId: 1, createdAt: -1 });
offsetSchema.index({ paymentId: 1 }, { unique: true });

export default mongoose.model("Offset", offsetSchema);
