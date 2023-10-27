const express = require("express");
const {
    getAllOrder,
    getOrderById,
    deleteOrder,
    updateOrder,
    insertOrder
} = require("../controllers/order");
const { verifyUser } = require("../utilis/verifyToken");

// Router Order
const router = express.Router();
router.get("/", verifyUser, getAllOrder);
router.get("/:id", verifyUser, getOrderById);
router.post("/", verifyUser, insertOrder);
router.delete("/:id", verifyUser, deleteOrder);
router.patch("/:id", verifyUser, updateOrder);


module.exports = router;