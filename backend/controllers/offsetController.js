// import Offset from "../models/Offset.js";
// import User from "../models/User.js";

// // @desc    Calculate offset cost
// // @route   GET /api/offset/calculate-cost
// export const calculateOffsetCost = async (req, res) => {
//   try {
//     const { carbonAmount } = req.query;
//     const amount = parseFloat(carbonAmount) || 0;

//     // Calculate cost: $10 per 1000 kg CO2 (typical market rate)
//     const cost = (amount / 1000) * 10;

//     res.json({
//       success: true,
//       data: {
//         carbonAmount: amount,
//         cost: Math.round(cost * 100) / 100, // Round to 2 decimal places
//         currency: "USD",
//       },
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Server error calculating offset cost",
//     });
//   }
// };

// // @desc    Create payment intent for offset
// // @route   POST /api/offset/create-payment
// export const createPayment = async (req, res) => {
//   try {
//     const { carbonAmount, project } = req.body;
//     const userId = req.user.id;

//     // Calculate cost
//     const cost = (carbonAmount / 1000) * 10;
//     const amountInCents = Math.round(cost * 100);

//     // In a real implementation, you would integrate with Stripe here
//     // For the MVP, we'll simulate the payment process

//     const paymentIntent = {
//       id: `pi_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
//       client_secret: `cs_${Math.random().toString(36).substr(2, 32)}`,
//       amount: amountInCents,
//       currency: "usd",
//       status: "requires_payment_method",
//     };

//     res.json({
//       success: true,
//       data: {
//         paymentIntent,
//         carbonAmount,
//         cost,
//         project,
//       },
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Server error creating payment",
//     });
//   }
// };

// // @desc    Confirm payment and create offset record
// // @route   POST /api/offset/confirm-payment
// export const confirmPayment = async (req, res) => {
//   try {
//     const { paymentIntentId, carbonAmount, project, amount } = req.body;
//     const userId = req.user.id;

//     // Create offset record
//     const offset = await Offset.create({
//       userId,
//       amount: amount / 100, // Convert cents to dollars
//       carbonAmount,
//       paymentId: paymentIntentId,
//       status: "completed",
//       project: project || "Renewable Energy Project",
//     });

//     // Update user's total offset
//     await User.findByIdAndUpdate(userId, {
//       $inc: { "stats.totalOffset": carbonAmount },
//     });

//     res.json({
//       success: true,
//       data: offset,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Server error confirming payment",
//     });
//   }
// };

// // @desc    Get user's offset history
// // @route   GET /api/offset/history
// export const getOffsetHistory = async (req, res) => {
//   try {
//     const userId = req.user.id;

//     const offsets = await Offset.find({ userId })
//       .sort({ createdAt: -1 })
//       .limit(50);

//     res.json({
//       success: true,
//       data: offsets,
//       count: offsets.length,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Server error fetching offset history",
//     });
//   }
// };

import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// In controllers/offsetController.js - update confirmPayment function
export const confirmPayment = async (req, res) => {
  try {
    const { paymentIntentId, carbonAmount, project, amount } = req.body;
    const userId = req.user.id;

    // Create offset record
    const offset = await Offset.create({
      userId,
      amount: amount / 100, // Convert cents to dollars
      carbonAmount,
      paymentId: paymentIntentId,
      status: "completed",
      project: project || "Renewable Energy Project",
    });

    // Update user's total offset
    await User.findByIdAndUpdate(userId, {
      $inc: { "stats.totalOffset": carbonAmount },
    });

    res.json({
      success: true,
      data: offset,
    });
  } catch (error) {
    console.error("Error in confirmPayment:", error);
    res.status(500).json({
      success: false,
      message: "Server error confirming payment",
    });
  }
};
