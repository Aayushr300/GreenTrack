import express from "express";
import {
  addEntry,
  getEntries,
  getEntry,
  updateEntry,
  deleteEntry,
  getStats,
  getEmissionsByCategory,
} from "../controllers/carbonController.js";
import { protect } from "../middleware/auth.js";
import { body } from "express-validator";

const router = express.Router();

// Validation rules
const carbonEntryValidation = [
  body("category")
    .isIn(["transport", "food", "energy", "shopping", "other"])
    .withMessage("Invalid category"),
  body("activity").notEmpty().withMessage("Activity is required"),
  body("details").isObject().withMessage("Details must be an object"),
];

// Routes
router.post("/", protect, carbonEntryValidation, addEntry);
router.get("/", protect, getEntries);
router.get("/stats", protect, getStats);
router.get("/categories", protect, getEmissionsByCategory);
router.get("/:id", protect, getEntry);
router.put("/:id", protect, carbonEntryValidation, updateEntry);
router.delete("/:id", protect, deleteEntry);

export default router;
