const express = require("express");
const {
    getAllFood,
    getFoodById,
    deleteFood,
    updateFood,
    insertFood,
} = require("./../controllers/food")
const { verifyAdmin } = require("../utilis/verifyToken");

// Router Food
const router = express.Router();
router.get("/", getAllFood);
router.get("/:id", getFoodById);
router.post("/", verifyAdmin, insertFood);
router.delete("/:id", verifyAdmin, deleteFood);
router.patch("/:id", verifyAdmin, updateFood);


module.exports = router;