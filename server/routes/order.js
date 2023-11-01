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
router.get("/", getAllOrder);
router.get("/:id", getOrderById);
router.post("/", insertOrder);
router.delete("/:id", deleteOrder);
router.patch("/:id", updateOrder);


module.exports = router;