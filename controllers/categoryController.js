// ----- category model -----

var category = require("../models/category");


// ----- add category page -----

module.exports.add_category = async (req, res) => {

    try {

        return res.render("category/add_category")
    }
    catch (err) {
        console.log(err);
        return res.redirect("back")
    }

}


// ----- insert category -----

module.exports.insert_category = async (req, res) => {

    try {

        req.body.isActive = true;
        req.body.createdDate = new Date().toLocaleString();
        req.body.updatedDate = new Date().toLocaleString();

        var insert = await category.create(req.body);
        if (insert) {
            console.log("category insert");
            return res.redirect("/admin/category/view_category")
        }
        else {
            console.log("category not insert");
            return res.redirect("back")
        }
    }
    catch (err) {
        console.log(err);
        return res.redirect("back")
    }

}


// ----- view category page -----

module.exports.view_category = async (req, res) => {

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

        var categoryData = await category.find({
            "category_name": { $regex: ".*" + search + ".*", $options: "i" }
        }).limit(perPage).skip(perPage * page);
        var totalDocument = await category.find({
            "category_name": { $regex: ".*" + search + ".*", $options: "i" }
        }).countDocuments()
        if (categoryData) {

            return res.render("category/view_category", {
                "categoryData": categoryData,
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

        var change = await category.findByIdAndUpdate(req.query.id, { isActive: false });

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

        var change = await category.findByIdAndUpdate(req.query.id, { isActive: true });

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


// ----- edit category -----

module.exports.edit_category = async (req, res) => {

    try {

        var oldData = await category.findById(req.query.id);
        if (oldData) {
            return res.render("category/update_category", {
                category: oldData
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


// ----- update category -----

module.exports.update_category = async (req, res) => {
    try {
        req.body.updatedDate = new Date().toLocaleString();

        var update = await category.findByIdAndUpdate(req.body.editId, req.body);
        if (update) {
            return res.redirect("/admin/category/view_category")
        }
        else {
            console.log("not updated")
            return res.redirect("back")
        }

    }
    catch (err) {
        console.log(err)
        return res.redirect("back")
    }
}

// ----- delete many -----

module.exports.delete_many = async (req, res) => {
    try {

        var abc = await category.deleteMany({ _id: { $in: req.body.deleteAll } });
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
