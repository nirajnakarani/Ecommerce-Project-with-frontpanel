// ----- mongoose -----

var mongoose = require("mongoose");


// ----- cart schema -----

var cartSchema = mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "productData",
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userData",
        required: true
    },
    quantity: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    }
})


// ----- table  -----

var cart = mongoose.model("cartData", cartSchema);


// ----- export model -----

module.exports = cart