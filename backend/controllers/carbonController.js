import CarbonLog from "../models/CarbonLog.js";

// Emission factors (kg CO2 per unit)
const EMISSION_FACTORS = {
  transport: {
    car_petrol: 0.21,
    car_diesel: 0.18,
    car_ev: 0.05, // depends on electricity source
    bus: 0.1,
    train: 0.04,
    plane_short: 0.25,
    plane_long: 0.18,
    motorcycle: 0.12,
    bicycle: 0,
    walking: 0,
  },
  food: {
    beef: 27.0,
    lamb: 24.0,
    cheese: 13.5,
    pork: 6.9,
    chicken: 6.9,
    fish: 5.1,
    eggs: 4.5,
    milk: 3.2,
    vegetables: 2.0,
    fruits: 1.1,
    grains: 1.4,
  },
  energy: {
    electricity: 0.5, // kg CO2 per kWh - varies by region
    natural_gas: 2.0, // kg CO2 per m3
    heating_oil: 2.7, // kg CO2 per liter
    propane: 1.5, // kg CO2 per liter
    coal: 2.3, // kg CO2 per kg
  },
  shopping: {
    electronics: 50, // average per item
    clothing: 15, // per item
    furniture: 80, // per item
    plastic: 6, // per kg
    paper: 1.5, // per kg
  },
};

// @desc    Add carbon entry
// @route   POST /api/carbon
export const addEntry = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: errors.array(),
      });
    }

    const { category, activity, details } = req.body;

    // Calculate emission based on category and activity
    let emission = calculateEmission(category, activity, details);

    const carbonEntry = await CarbonLog.create({
      userId: req.user.id,
      category,
      activity,
      details,
      emission,
    });

    res.status(201).json({
      success: true,
      data: carbonEntry,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error adding carbon entry",
    });
  }
};

// @desc    Get user's carbon entries
// @route   GET /api/carbon
export const getEntries = async (req, res) => {
  try {
    const { startDate, endDate, category, limit = 50, page = 1 } = req.query;
    let query = { userId: req.user.id };

    // Date filtering
    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }

    // Category filtering
    if (category) {
      query.category = category;
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const entries = await CarbonLog.find(query)
      .sort({ date: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await CarbonLog.countDocuments(query);

    res.json({
      success: true,
      data: entries,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error fetching carbon entries",
    });
  }
};

// @desc    Get single carbon entry
// @route   GET /api/carbon/:id
export const getEntry = async (req, res) => {
  try {
    const entry = await CarbonLog.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!entry) {
      return res.status(404).json({
        success: false,
        message: "Carbon entry not found",
      });
    }

    res.json({
      success: true,
      data: entry,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error fetching carbon entry",
    });
  }
};

// @desc    Update carbon entry
// @route   PUT /api/carbon/:id
export const updateEntry = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: errors.array(),
      });
    }

    const { category, activity, details } = req.body;
    const emission = calculateEmission(category, activity, details);

    const entry = await CarbonLog.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { category, activity, details, emission },
      { new: true }
    );

    if (!entry) {
      return res.status(404).json({
        success: false,
        message: "Carbon entry not found",
      });
    }

    res.json({
      success: true,
      data: entry,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error updating carbon entry",
    });
  }
};

// @desc    Delete carbon entry
// @route   DELETE /api/carbon/:id
export const deleteEntry = async (req, res) => {
  try {
    const entry = await CarbonLog.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!entry) {
      return res.status(404).json({
        success: false,
        message: "Carbon entry not found",
      });
    }

    res.json({
      success: true,
      message: "Carbon entry deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error deleting carbon entry",
    });
  }
};

// @desc    Get carbon statistics
// @route   GET /api/carbon/stats
export const getStats = async (req, res) => {
  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    // Get total emissions for last 30 days
    const totalEmissions = await CarbonLog.aggregate([
      {
        $match: {
          userId: req.user._id,
          date: { $gte: thirtyDaysAgo },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$emission" },
        },
      },
    ]);

    // Get emissions by category
    const emissionsByCategory = await CarbonLog.aggregate([
      {
        $match: {
          userId: req.user._id,
          date: { $gte: thirtyDaysAgo },
        },
      },
      {
        $group: {
          _id: "$category",
          total: { $sum: "$emission" },
        },
      },
    ]);

    // Get weekly trend
    const weeklyTrend = await CarbonLog.aggregate([
      {
        $match: {
          userId: req.user._id,
          date: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$date" },
          },
          dailyTotal: { $sum: "$emission" },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.json({
      success: true,
      data: {
        totalEmissions: totalEmissions[0]?.total || 0,
        emissionsByCategory,
        weeklyTrend,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error fetching statistics",
    });
  }
};

// @desc    Get emissions by category
// @route   GET /api/carbon/categories
export const getEmissionsByCategory = async (req, res) => {
  try {
    const emissionsByCategory = await CarbonLog.aggregate([
      {
        $match: {
          userId: req.user._id,
        },
      },
      {
        $group: {
          _id: "$category",
          totalEmissions: { $sum: "$emission" },
          entryCount: { $sum: 1 },
          averageEmission: { $avg: "$emission" },
        },
      },
      {
        $sort: { totalEmissions: -1 },
      },
    ]);

    res.json({
      success: true,
      data: emissionsByCategory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error fetching category data",
    });
  }
};

// Helper function to calculate emissions
function calculateEmission(category, activity, details) {
  switch (category) {
    case "transport":
      return (
        (EMISSION_FACTORS.transport[activity] || 0.15) * (details.distance || 0)
      );

    case "food":
      return (EMISSION_FACTORS.food[activity] || 5.0) * (details.quantity || 0);

    case "energy":
      return (
        (EMISSION_FACTORS.energy[activity] || 1.0) * (details.quantity || 0)
      );

    default:
      return details.quantity || 0;
  }
}
