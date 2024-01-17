// ----- mongoose -----

var mongoose = require("mongoose");


// ----- order schema -----

var orderSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userData"
    },
    productId: {
        type: Array,
        ref: "productData",
        required: true
    },
    cartId: {
        type: Array,
        ref: "cartData",
        required: true
    },
    status: {
        type: String,
        required: true
    }
})


// ----- table  -----

var order = mongoose.model("orderData", orderSchema);


// ----- export model -----

module.exports = order