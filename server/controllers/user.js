const mongoose = require("mongoose");
const httpStatus = require("http-status-codes");
const {
    getallUserDB,
    getUserByIdDB,
    countDocuUserDB,
    deleteUserDB,
    updateUserDB,
} = require("./../models/userModel")

// read all users
const getallUser = async (req, res) => {
    try {
        // page number
        const page = parseInt(req.query.page) || 1;
        // number of user per page
        const perPage = parseInt(req.query.perPage) || 10;
        // calculate total number of documents and how many page are needed
        const totalUser = await countDocuUserDB();
        const totalPages = Math.ceil(totalUser / perPage)
        const users = await getallUserDB(page, perPage)
        res.status(httpStatus.OK).json({
            success: true,
            data: users,
            pageInfo: {
                currentPage: page,
                totalPages: totalPages,
                totalUser: totalUser
            }
        });
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: error.message
        })
    }
}
// read only one user
const getUserById = async (req, res) => {
    const { id = _id } = req.params;
    try {
        const user = await getUserByIdDB(id)
        res.status(httpStatus.OK).json({
            success: true,
            data: user
        })
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: error.message
        })
    }
}
// delete user
const deleteUser = async (req, res) => {
    const { id = _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(httpStatus.NOT_FOUND).json({
            success: false,
            message: "invalid id"
        })
    }
    try {
        await deleteUserDB(id)
        res.status(httpStatus.OK).json({
            success: true,
            message: "user successfully deleted"
        })
    } catch (error) {
        res.status(httpStatus.NOT_FOUND), json({
            success: false,
            message: error.message
        })
    }
}
//modify user
const updateUser = async (req, res) => {
    const { id = _id } = req.params;
    const data = { ...req.body };
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(httpStatus.NOT_FOUND).json({
            success: false,
            message: "invalid id",
        })
    }
    try {
        const user = await updateUserDB(id, data)
        res.status(httpStatus.OK).json({
            success: true,
            message: `user changed successfully`,
            data: user
        });
    } catch (error) {
        res.status(httpStatus.NOT_FOUND).json({
            success: false,
            message: error.message
        });
    }
}

module.exports = {
    getallUser,
    getUserById,
    deleteUser,
    updateUser
}