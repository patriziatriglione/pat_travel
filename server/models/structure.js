const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const structureSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true,
    },
    service: {
        type: [String],
        required: true,
    },
    maxPeople: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        require: true,
    },
    animals: {
        type: Boolean,
    },
    children: {
        type: Number,
    },
    remoteWork: {
        type: Boolean,
    },
}, { timestamps: true })

const structure = mongoose.model("structures", structureSchema);
module.exports = structure;