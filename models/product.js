// ----- mongoose -----

var mongoose = require("mongoose");


// ----- single product img path -----

var singleImgPath = "/uploads/productImg/single";


// ----- multi product img path -----

var multiImgPath = "/uploads/productImg/multi";


// ----- multer -----

var multer = require("multer")


// ----- path -----

var path = require("path")


// ----- product schema -----

var productSchema = mongoose.Schema({
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "categoryData",
        required: true
    },
    subcategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "subcategoryData",
        required: true
    },
    extracategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "extracategoryData",
        required: true
    },
    brandId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "brandData",
        required: true
    },
    typeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "typeData",
        required: true
    },
    title: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    old_price: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    single_img: {
        type: String,
        required: true
    },
    multi_img: {
        type: Array,
        required: true
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
    },
})


// ----- img -----

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (file.fieldname == "single_img") {
            cb(null, path.join(__dirname, "..", singleImgPath))
        }
        else {
            cb(null, path.join(__dirname, "..", multiImgPath))
        }
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Math.random() * 1000000)
    }
})


// ----- single img -----

productSchema.statics.uploadproductImg = multer({ storage: storage }).fields([{ name: "single_img", maxCount: 1 }, { name: "multi_img", maxCount: 5 }])


// ----- export single product img path -----

productSchema.statics.singleImgPath = singleImgPath;


// ----- export single product img path -----

productSchema.statics.multiImgPath = multiImgPath;


// ----- table  -----

var product = mongoose.model("productData", productSchema);


// ----- export model -----

module.exports = product