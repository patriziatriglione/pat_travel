const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const packageSchema = new Schema({
    city: {
        type: String,
        required: true,
    },
    nation: {
        type: String,
        required: true,
    },
    packageNumber: {
        type: String,
        required: true,
    },
    image: {
        type: [String],
    },
    toInclude: [
        {
            name: { type: String, },
            description: { type: String },
            price: { type: Number }
        }
    ],
    crazyFor: {
        type: [String],
        required: true,
    },
    icon: {
        type: [String]
    },
    price: {
        type: Number,
    },
    structure: {
        type: Schema.Types.ObjectId,
        ref: "structure"
    },
    food: {
        type: String,
    },
    activity: {
        type: String
    },
    rental: {
        type: Boolean,
    },
}, { timestamps: true })

const package = mongoose.model("packages", packageSchema);
module.exports = package;
