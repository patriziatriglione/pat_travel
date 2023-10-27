const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const activitySchema = new Schema({
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
    price: {
        type: String,
    },
    text: {
        type: String,
        required: true,
    },
    hours: {
        type: String,
    }
}, { timestamps: true })

const activity = mongoose.model("activities", activitySchema);
module.exports = activity;
