// ----- mongoose -----

var mongoose = require("mongoose");


// ----- admin img path -----

var adminImgPath = "/uploads/adminImg";


// ----- multer -----

var multer = require("multer")


// ----- path -----

var path = require("path")


// ----- admin schema -----

var adminSchema = mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    description: {
        type: String,
    },
    city: {
        type: String,
    },
    gender: {
        type: String,
    },
    hobby: {
        type: Array,
    },
    admin_img: {
        type: String,
    },
    role: {
        type: String,
    },
    isActive: {
        type: Boolean,
    },
    createdDate: {
        type: String,
    },
    updatedDate: {
        type: String,
    }
})


// ----- img -----

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "..", adminImgPath))
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now())
    }
})


// ----- single img -----

adminSchema.statics.uploadAdminImg = multer({ storage: storage }).single("admin_img");


// ----- export admin img path -----

adminSchema.statics.adminImgPath = adminImgPath;


// ----- table  -----

var admin = mongoose.model("adminData", adminSchema);


// ----- export model -----

module.exports = admin