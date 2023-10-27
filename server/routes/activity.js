const express = require("express");
const {
    getAllActivity,
    getActivityById,
    deleteActivity,
    updateActivity,
    insertActivity
} = require("./../controllers/activity")
const { verifyAdmin } = require("../utilis/verifyToken");

// Router Activities
const router = express.Router();
router.get("/", getAllActivity);
router.get("/:id", getActivityById);
router.post("/", verifyAdmin, insertActivity);
router.delete("/:id", verifyAdmin, deleteActivity);
router.patch("/:id", verifyAdmin, updateActivity);


module.exports = router;