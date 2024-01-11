// ----- mongoose -----

var mongoose = require("mongoose");


// ----- category schema -----

var subcategorySchema = mongoose.Schema({
    subcategory_name: {
        type: String,
        required: true
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "categoryData"
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

var sub_category = mongoose.model("subcategoryData", subcategorySchema);


// ----- export model -----

module.exports = sub_category