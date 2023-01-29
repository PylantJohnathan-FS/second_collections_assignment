const mongoose = require("mongoose");

const customerSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    motorcycle: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Motorcycle',
        strictPopulate: false,
        required: true,
    },
});

module.exports = mongoose.model("Customer", customerSchema);