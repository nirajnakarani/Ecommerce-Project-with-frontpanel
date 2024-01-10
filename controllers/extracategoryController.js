// ----- category model -----

var category = require("../models/category");


// ----- sub category model -----

var subcategory = require("../models/subcategory");


// ----- extra category model -----

var extracategory = require("../models/extracategory");


// ----- brand model -----

var brand = require("../models/brand");


// ----- type model -----

var type = require("../models/type");


// ----- add extracategory page -----

module.exports.add_extracategory = async (req, res) => {

    try {
        var categoryData = await category.find({ isActive: true });
        var subcategoryData = await subcategory.find({ isActive: true });
        if (categoryData) {
            return res.render("extracategory/add_extracategory", {
                categoryData: categoryData,
                subcategoryData: subcategoryData
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


// ----- insert extracategory -----

module.exports.insert_extracategory = async (req, res) => {

    try {

        req.body.isActive = true;
        req.body.createdDate = new Date().toLocaleString();
        req.body.updatedDate = new Date().toLocaleString();

        var insert = await extracategory.create(req.body);
        if (insert) {
            console.log("extracategory insert");
            return res.redirect("/admin/extracategory/view_extracategory")
        }
        else {
            console.log("extracategory not insert");
            return res.redirect("back")
        }
    }
    catch (err) {
        console.log(err);
        return res.redirect("back")
    }

}


// ----- view extracategory page -----

module.exports.view_extracategory = async (req, res) => {

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
        var perPage = 2


        var extracategoryData = await extracategory.find({
            "extracategory_name": { $regex: ".*" + search + ".*", $options: "i" }
        }).populate(["categoryId", "subcategoryId"]).limit(perPage).skip(perPage * page).exec();

        var totalDocument = await extracategory.find({
            "extracategory_name": { $regex: ".*" + search + ".*", $options: "i" }
        }).countDocuments()

        if (extracategoryData) {
            return res.render("extracategory/view_extracategory", {
                "extracategoryData": extracategoryData,
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

        var change = await extracategory.findByIdAndUpdate(req.query.id, { isActive: false });

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

        var change = await extracategory.findByIdAndUpdate(req.query.id, { isActive: true });

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


// ----- edit extracategory -----

module.exports.edit_extracategory = async (req, res) => {

    try {

        var oldData = await extracategory.findById(req.query.id).populate(["categoryId", "subcategoryId"]).exec();
        var categoryData = await category.find({ isActive: true })
        var subcategoryData = await subcategory.find({ isActive: true })
        if (oldData) {
            return res.render("extracategory/update_extracategory", {
                extracategory: oldData,
                categoryData: categoryData,
                subcategoryData: subcategoryData
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


// ----- update extracategory -----

module.exports.update_extracategory = async (req, res) => {
    try {
        req.body.updatedDate = new Date().toLocaleString();

        var update = await extracategory.findByIdAndUpdate(req.body.editId, req.body);
        if (update) {
            return res.redirect("/admin/extracategory/view_extracategory")
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

        var abc = await extracategory.deleteMany({ _id: { $in: req.body.deleteAll } });
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

// ----- get extra cat -----

module.exports.getextracat = async (req, res) => {
    try {

        var extracatData = await extracategory.find({ subcategoryId: req.body.subcategoryId, isActive: true });
        if (extracatData) {

            var opt = `<option value="">-- - --</option>`;

            extracatData.map((v, i) => {
                opt += `<option value="${v.id}">${v.extracategory_name}</option>`
            })

            return res.json(opt)


        }
        else {
            console.log("sub category not found")
        }

    }
    catch (err) {
        console.log(err);
        return res.redirect("back")
    }
}


// ----- get brand type -----

module.exports.getbrandType = async (req, res) => {

    try {

        var brandData = await brand.find({ extracategoryId: req.body.extracategoryId, isActive: true });
        var typeData = await type.find({ extracategoryId: req.body.extracategoryId, isActive: true });
        if (brandData) {

            var optBrand = `<option value="">-- - --</option>`;
            var optType = `<option value="">-- - --</option>`;

            brandData.map((v, i) => {
                optBrand += `<option value="${v.id}">${v.brand_name}</option>`
            })

            typeData.map((v, i) => {
                optType += `<option value="${v.id}">${v.type_name}</option>`
            })

            return res.json([optBrand, optType])
        }
        else {
            console.log("brand not found")
        }

    }
    catch (err) {
        console.log(err)
        return res.redirect("back")
    }
}