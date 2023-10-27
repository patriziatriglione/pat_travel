const express = require("express");
const { verifyAdmin } = require("../utilis/verifyToken");
const {
    insertStructure,
    deleteStructure,
    updateStructure,
    getStructureById,
    getallStructure } = require("../controllers/structure");

// Router Structure
const router = express.Router();
router.get("/", getallStructure);
router.get("/:id", getStructureById);
router.post("/:packageid", verifyAdmin, insertStructure);
router.delete("/:id/:packageid", verifyAdmin, deleteStructure);
router.patch("/:id", verifyAdmin, updateStructure);


module.exports = router;