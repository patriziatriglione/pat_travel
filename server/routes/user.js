const express = require("express");
const { getallUser,
    getUserById,
    deleteUser,
    updateUser
} = require("./../controllers/user");
const { verifyToken, verifyUser, verifyAdmin } = require("../utilis/verifyToken");

const router = express.Router();
router.get("/check", verifyToken, (req, res, next) => {
    res.send("You are logged in")
})
router.get("/checkuser/:id", verifyUser, (req, res, next) => {
    res.send("You are logged and can delete you account")
})
router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
    res.send("Hallo admiin, you are logged")
})
router.get("/", verifyAdmin, getallUser);
router.get("/:id", verifyUser, getUserById);
router.delete("/:id", verifyUser, deleteUser);
router.patch("/:id", verifyUser, updateUser);

module.exports = router;