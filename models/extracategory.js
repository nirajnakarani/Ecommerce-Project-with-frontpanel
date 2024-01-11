// ----- mongoose -----

var mongoose = require("mongoose");


// ----- category schema -----

var extracategorySchema = mongoose.Schema({
    extracategory_name: {
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

var extra_category = mongoose.model("extracategoryData", extracategorySchema);


// ----- export model -----

module.exports = extra_category