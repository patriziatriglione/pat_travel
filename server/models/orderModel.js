const Order = require("./order")

// read all orders
const getAllOrderDB = async (page, perPage) => {
    return Order.find()
        .skip((page - 1) * perPage)
        .limit(perPage)
};
// reand only one order
const getOrderByIdDB = async (orders) => {
    return Order.find({
        _id: { $in: orders }
    })
};
// add new order
const insertOrderDB = async (order) => {
    const newOrder = new Order(order);
    await newOrder.save();
    return newOrder;
};
//delete order
const deleteOrderDB = async (_id) => {
    return Order.findByIdAndDelete(_id);
};
//modify order
const updateOrderDB = async (_id, data) => {
    return Order.findByIdAndUpdate(_id, data, { new: true })
};
// calculate total number of order
const countDocuOrderDB = async () => {
    return Order.countDocuments()
};

module.exports = {
    getAllOrderDB,
    getOrderByIdDB,
    deleteOrderDB,
    updateOrderDB,
    countDocuOrderDB,
    insertOrderDB,
}