const express = require("express");
const {
    getAllPackage,
    getPackageById,
    deletePackage,
    updatePackage,
    insertPackage
} = require("../controllers/package");
const { verifyAdmin } = require("../utilis/verifyToken");

// Router Package
const router = express.Router();
router.get("/", getAllPackage);
router.get("/:id", getPackageById);
router.post("/", verifyAdmin, insertPackage);
router.delete("/:id", verifyAdmin, deletePackage);
router.patch("/:id", verifyAdmin, updatePackage);


module.exports = router;