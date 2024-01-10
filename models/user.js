// ----- mongoose -----

var mongoose = require("mongoose");

// ----- user schema -----

var userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    }

})

// ----- table  -----

var user = mongoose.model("userData", userSchema);


// ----- export model -----

module.exports = user