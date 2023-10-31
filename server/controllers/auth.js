const mongoose = require("mongoose");
const httpStatus = require("http-status-codes");
const User = require("./../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// register function
const register = async (req, res) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const newUser = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            accountName: req.body.accountName,
            address: req.body.address,
            city: req.body.city,
            zipCode: req.body.zipCode,
            email: req.body.email,
            password: hash,
        })
        await newUser.save()
        res.status(httpStatus.OK).send("User has been created")
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: error.message
        })
    }
}
// login function
const login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        //user
        if (!user)
            return res.status(httpStatus.NOT_FOUND).json({
                success: false,
                message: "User not found"
            });
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)
        // password
        if (!isPasswordCorrect)
            return res.status(httpStatus.NOT_FOUND).send({
                success: false,
                message: "Wrong password"
            })
        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT);
        const { password, ...otherDetails } = user._doc;
        res.cookie("access_token", token, {
                httpOnly: true,
                secure: true,
                sameSite: "none"
            })
            .status(httpStatus.OK).json({ ...otherDetails })
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: error.message
        })
    }
}
module.exports = {
    register,
    login,
}