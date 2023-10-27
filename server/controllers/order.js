const mongoose = require("mongoose");
const httpStatus = require("http-status-codes");
const {
    getAllOrderDB,
    getOrderByIdDB,
    deleteOrderDB,
    updateOrderDB,
    countDocuOrderDB,
    insertOrderDB,
} = require("./../models/orderModel")

// read all order
const getAllOrder = async (req, res) => {
    try {
        // page number
        const page = parseInt(req.query.page) || 1;
        // number of order per page
        const perPage = parseInt(req.query.perPage) || 10;
        // calculate total number of documents and how many pages are needed to include documents based on "perPage"
        const totalOrder = await countDocuOrderDB();
        const totalPages = Math.ceil(totalOrder / perPage)
        const orders = await getAllOrderDB(page, perPage)
        // Sort packages by createdAt field in descending order (most recent first)
        orders.sort((a, b) => b.createdAt - a.createdAt);
        res.status(httpStatus.OK).json({
            success: true,
            data: orders,
            pageInfo: {
                currentPage: page,
                totalPages: totalPages,
                totalOrder: totalOrder
            }
        });
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: error.message
        })
    }
}
// read only one order
const getOrderById = async (req, res) => {
    const { id = _id } = req.params;
    try {
        const order = await getOrderByIdDB(id)
        res.status(httpStatus.OK).json({
            success: true,
            data: order
        })
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: error.message
        })
    }
}
// add new Order
const insertOrder = async (req, res) => {
    try {
        const order = await insertOrderDB(req.body);
        res.status(httpStatus.CREATED).json({
            success: true,
            data: order
        })
    } catch (error) {
        res.status(httpStatus.CONFLICT).json({
            success: false,
            message: error.message
        })
    }
}
// delete Order
const deleteOrder = async (req, res) => {
    const { id = _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(httpStatus.NOT_FOUND).json({
            success: false,
            message: "invalid id",
        })
    }
    try {
        await deleteOrderDB(id)
        res.status(httpStatus.OK).json({
            success: true,
            message: `Order successfully deleted`
        })
    } catch (error) {
        res.status(httpStatus.NOT_FOUND).json({
            success: false,
            message: error.message
        })
    }
}
// modify Order
const updateOrder = async (req, res) => {
    const { id = _id } = req.params;
    const data = { ...req.body };
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(httpStatus.NOT_FOUND).json({
            success: false,
            message: "invalid id",
        })
    }
    try {
        const order = await updateOrderDB(id, data)
        res.status(httpStatus.OK).json({
            success: true,
            message: `Order changed successfully`,
            data: order
        });
    } catch (error) {
        res.status(httpStatus.NOT_FOUND).json({
            success: false,
            message: error.message
        });
    }
}

module.exports = {
    getAllOrder,
    getOrderById,
    deleteOrder,
    updateOrder,
    insertOrder
};