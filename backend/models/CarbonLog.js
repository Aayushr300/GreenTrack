import mongoose from "mongoose";

const carbonLogSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: String,
      enum: ["transport", "food", "energy", "shopping", "other"],
      required: true,
    },
    activity: {
      type: String,
      required: true,
    },
    details: {
      distance: Number,
      fuelType: String,
      quantity: Number,
      unit: String,
      description: String,
    },
    emission: {
      type: Number,
      required: true,
    }, // kg CO2
    date: {
      type: Date,
      default: Date.now,
    },
    location: String,
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
carbonLogSchema.index({ userId: 1, date: -1 });
carbonLogSchema.index({ userId: 1, category: 1 });

export default mongoose.model("CarbonLog", carbonLogSchema);
