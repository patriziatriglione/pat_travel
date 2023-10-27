const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const foodSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    nation: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    text: {
        type: String,
        required: true,
    },
}, { timestamps: true })

const food = mongoose.model("foods", foodSchema);
module.exports = food;