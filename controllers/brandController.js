// ----- category model -----

var category = require("../models/category");


// ----- sub category model -----

var subcategory = require("../models/subcategory");


// ----- extra category model -----

var extracategory = require("../models/extracategory");


// ----- brand model -----

var brand = require("../models/brand");


// ----- add brand page -----

module.exports.add_brand = async (req, res) => {

    try {
        var categoryData = await category.find({ isActive: true });
        var subcategoryData = await subcategory.find({ isActive: true });
        var extracategoryData = await extracategory.find({ isActive: true })
        if (categoryData) {
            return res.render("brand/add_brand", {
                categoryData: categoryData,
                subcategoryData: subcategoryData,
                extracategoryData: extracategoryData
            })
        }
        else {
            console.log("data not found")
            return res.redirect("back")
        }
    }
    catch (err) {
        console.log(err);
        return res.redirect("back")
    }

}


// ----- insert brand -----

module.exports.insert_brand = async (req, res) => {

    try {

        req.body.isActive = true;
        req.body.createdDate = new Date().toLocaleString();
        req.body.updatedDate = new Date().toLocaleString();

        var insert = await brand.create(req.body);
        if (insert) {
            console.log("brand insert");
            return res.redirect("/admin/brand/view_brand")
        }
        else {
            console.log("brand not insert");
            return res.redirect("back")
        }
    }
    catch (err) {
        console.log(err);
        return res.redirect("back")
    }

}


// ----- view brand page -----

module.exports.view_brand = async (req, res) => {

    try {
        var search = "";
        if (req.query.search) {
            search = req.query.search
        }
        if (req.query.page) {
            page = req.query.page
        }
        else {
            page = 0
        }
        var perPage = 2;

        var brandData = await brand.find({
            "brand_name": { $regex: ".*" + search + ".*", $options: "i" }
        }).populate(["categoryId", "subcategoryId", "extracategoryId"]).limit(perPage).skip(perPage * page).exec();

        var totalDocument = await brand.find({
            "brand_name": { $regex: ".*" + search + ".*", $options: "i" }
        }).countDocuments()

        if (brandData) {
            return res.render("brand/view_brand", {
                "brandData": brandData,
                search: search,
                totalDocument: Math.ceil(totalDocument / perPage)
            })
        }
        else {
            console.log("data not found");
            return res.redirect("back")
        }
    }
    catch (err) {
        console.log(err);
        return res.redirect("back")
    }

}


// ----- set deactive -----

module.exports.set_deactive = async (req, res) => {

    try {

        var change = await brand.findByIdAndUpdate(req.query.id, { isActive: false });

        if (change) {
            console.log("deactive");
            return res.redirect("back")
        }
        else {
            console.log("not deactive");
            return res.redirect("back")
        }

    }
    catch (err) {
        console.log(err);
        return res.redirect("back")
    }

}


// ----- set active -----

module.exports.set_active = async (req, res) => {

    try {

        var change = await brand.findByIdAndUpdate(req.query.id, { isActive: true });

        if (change) {
            console.log("active");
            return res.redirect("back")
        }
        else {
            console.log("not active");
            return res.redirect("back")
        }

    }
    catch (err) {
        console.log(err);
        return res.redirect("back")
    }

}


// ----- edit brand -----

module.exports.edit_brand = async (req, res) => {

    try {

        var oldData = await brand.findById(req.query.id).populate(["categoryId", "subcategoryId", "extracategoryId"]).exec();
        var categoryData = await category.find({ isActive: true })
        var subcategoryData = await subcategory.find({ isActive: true })
        var extracategoryData = await extracategory.find({ isActive: true })
        if (oldData) {
            return res.render("brand/update_brand", {
                brand: oldData,
                categoryData: categoryData,
                subcategoryData: subcategoryData,
                extracategoryData: extracategoryData
            })

        }
        else {
            console.log("data not found");
            return res.redirect("back")
        }

    }
    catch (err) {
        console.log(err)
        return res.redirect("back")
    }

}


// ----- update brand -----

module.exports.update_brand = async (req, res) => {
    try {
        req.body.updatedDate = new Date().toLocaleString();

        var update = await brand.findByIdAndUpdate(req.body.editId, req.body);
        if (update) {
            return res.redirect("/admin/brand/view_brand")
        }
        else {
            console.log("not update");
            return res.redirect("back")
        }
    }
    catch (err) {
        console.log(err);
        return res.redirect("back")
    }
}


// ----- delete many -----

module.exports.delete_many = async (req, res) => {
    try {

        var abc = await brand.deleteMany({ _id: { $in: req.body.deleteAll } });
        if (abc) {
            return res.redirect("back")

        }
        else {
            console.log("data not delete");
            return res.redirect("back")
        }

    }
    catch (err) {
        console.log(err);
        return res.redirect("back")
    }
}
