// ----- mongoose -----

var mongoose = require("mongoose");


// ----- category schema -----

var brandSchema = mongoose.Schema({
    brand_name: {
        type: String,
        required: true
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "categoryData"
    },
    subcategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "subcategoryData"
    },
    extracategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "extracategoryData"
    },
    isActive: {
        type: Boolean,
        required: true
    },
    createdDate: {
        type: String,
        required: true
    },
    updatedDate: {
        type: String,
        required: true
    }
})


// ----- table  -----

var brand = mongoose.model("brandData", brandSchema);


// ----- export model -----

module.exports = brand