const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    package: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Package",
        required: true
    },
    checkIn: {
        type: Date,
        required: true
    },
    checkOut: {
        type: Date,
        required: true
    },
    adults: {
        type: Number,
        required: true,
    },
    children: {
        type: Number
    },
    price: {
        type: Number,
    },
    animals: {
        type: Boolean,
    },
    rental: {
        type: Boolean,
    },
}, { timestamps: true })

const order = mongoose.model("orders", orderSchema);
module.exports = order;
