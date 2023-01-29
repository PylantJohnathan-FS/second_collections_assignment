const mongoose = require("mongoose");

const motorcycleSchema = mongoose.Schema({
    year: {
        type: String,
        required: true,
    },
    make: {
        type: String,
        required: true,
    },
    model: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("Motorcycle", motorcycleSchema);