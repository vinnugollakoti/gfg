const mongoose = require("mongoose")

const Contact = new mongoose.Schema({
    fullname : {
        type: String,
        required: true
    },
    registrationno : {
        type: String,
        required : true
    },
    email : {
        type: String,
        required: true
    },
    year : {
        type: String,
        required: true
    },
    department : {
        type: String,
        required : true
    },
    mobileno : {
        type: String,
        required: true
    },
    domain : {
        type: String,
        required: true
    },
    additionalPreferences: {
        ML: Boolean,
        DSA: Boolean,
        GATE: Boolean
    }
})

module.exports = mongoose.model("Data", Contact, "data")