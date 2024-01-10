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


// ----- product model -----

var product = require("../models/product");


// ----- path -----

var path = require("path");


// ----- fs -----

var fs = require("fs");


// ----- add product page -----

module.exports.add_product = async (req, res) => {

    try {
        var categoryData = await category.find({ isActive: true });
        var subcategoryData = await subcategory.find({ isActive: true });
        var extracategoryData = await extracategory.find({ isActive: true })
        var brandData = await brand.find({ isActive: true })
        var typeData = await type.find({ isActive: true })
        if (categoryData) {
            return res.render("product/add_product", {
                categoryData: categoryData,
                subcategoryData: subcategoryData,
                extracategoryData: extracategoryData,
                brandData: brandData,
                typeData: typeData
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


// ----- insert product -----

module.exports.insert_product = async (req, res) => {

    try {

        var singleImg = ""
        var multiImg = []

        if (req.files) {
            singleImg = product.singleImgPath + "/" + req.files.single_img[0].filename;

            req.files.multi_img.map((v) => {
                multiImg.push(product.multiImgPath + "/" + v.filename)
            })
        }

        req.body.single_img = singleImg;
        req.body.multi_img = multiImg
        req.body.isActive = true;
        req.body.createdDate = new Date().toLocaleString();
        req.body.updatedDate = new Date().toLocaleString();

        var insert = await product.create(req.body);
        if (insert) {
            console.log("product insert");
            return res.redirect("/admin/product/view_product")
        }
        else {
            console.log("product not insert");
            return res.redirect("back")
        }
    }
    catch (err) {
        console.log(err);
        return res.redirect("back")
    }

}


// ----- view product page -----

module.exports.view_product = async (req, res) => {

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

        var productData = await product.find({
            $or: [
                { "title": { $regex: ".*" + search + ".*", $options: "i" } },
                { "price": { $regex: ".*" + search + ".*", $options: "i" } }
            ]
        }).populate(["categoryId", "subcategoryId", "extracategoryId", "brandId", "typeId"]).limit(perPage).skip(perPage * page).exec();

        var totalDocument = await product.find({
            $or: [
                { "title": { $regex: ".*" + search + ".*", $options: "i" } },
                { "price": { $regex: ".*" + search + ".*", $options: "i" } }
            ]
        }).countDocuments()
        if (productData) {
            return res.render("product/view_product", {
                "productData": productData,
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

        var change = await product.findByIdAndUpdate(req.query.id, { isActive: false });

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

        var change = await product.findByIdAndUpdate(req.query.id, { isActive: true });

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


// ----- deleteSpecificImg -----

module.exports.deleteSpecificImg = async (req, res) => {
    try {
        var oldData = await product.findById(req.body.id);
        // console.log(oldData)

        // console.log(req.body.index)
        if (oldData) {
            var fullPath = path.join(__dirname, "..", req.body.src);
            await fs.unlinkSync(fullPath);

            oldData.multi_img.splice(req.body.index, 1)
            var deleteImg = await product.findByIdAndUpdate(req.body.id, { multi_img: oldData.multi_img });
            if (deleteImg) {
                var updateData = await product.findById(req.body.id);
                if (updateData) {
                    var up = ``
                    updateData.multi_img.map((v, i) => {
                        up += `<div style="margin:5px;">`
                        up += `<img src="${v}" alt="" height="50" width="50"
                        onclick="return deleteSpecificImg('${v}','${updateData.id}','${i}')">`
                        up += `</div>`
                    })
                    return res.json(up)
                }
                else {
                    console.log("data not delete update")
                    return res.redirect("back")
                }
            }
            else {
                return res.redirect("back")
            }
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


// ----- delete product -----

module.exports.delete_product = async (req, res) => {

    try {

        var oldData = await product.findById(req.query.id);
        if (oldData) {
            var fullPath = path.join(__dirname, "..", oldData.single_img);
            await fs.unlinkSync(fullPath);

            oldData.multi_img.map(async (v) => {
                var fullPath = path.join(__dirname, "..", v)
                await fs.unlinkSync(fullPath);
            })

            var deleteData = await product.findByIdAndDelete(req.query.id);

            if (deleteData) {
                console.log("data delete");
                return res.redirect("back")
            }
            else {
                console.log("data not delete");
                return res.redirect("back")
            }


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


// ----- edit product -----

module.exports.edit_product = async (req, res) => {
    try {

        var productData = await product.findById(req.query.id).populate(["categoryId", "subcategoryId", "extracategoryId", "brandId", "typeId"]).exec();
        var categoryData = await category.find({ isActive: true });
        var subcategoryData = await subcategory.find({ isActive: true });
        var extracategoryData = await extracategory.find({ isActive: true })
        var brandData = await brand.find({ isActive: true })
        var typeData = await type.find({ isActive: true })
        if (productData) {
            return res.render("product/update_product", {
                productData: productData,
                categoryData: categoryData,
                subcategoryData: subcategoryData,
                extracategoryData: extracategoryData,
                brandData: brandData,
                typeData: typeData
            })
        }
        else {
            return res.redirect("back")
        }

    }
    catch (err) {
        console.log(err);
        return res.redirect("back")
    }
}


// ----- update product -----

module.exports.update_product = async (req, res) => {
    try {
        var oldData = await product.findById(req.body.editId);

        if (oldData) {

            if (req.files) {

                var singleImg = ""
                var multiImg = []
                if (req.files.single_img) {
                    var fullPath = path.join(__dirname, "..", oldData.single_img);

                    await fs.unlinkSync(fullPath);
                    singleImg = product.singleImgPath + "/" + req.files.single_img[0].filename;
                    req.body.single_img = singleImg;
                }
                else {
                    req.body.single_img = oldData.single_img;
                }

                if (req.files.multi_img) {
                    oldData.multi_img.map(async (v) => {
                        var fullPath = path.join(__dirname, "..", v)
                        await fs.unlinkSync(fullPath);
                    })

                    req.files.multi_img.map((v) => {
                        multiImg.push(product.multiImgPath + "/" + v.filename)
                    })

                    req.body.multi_img = multiImg
                }

                else {
                    req.body.multi_img = oldData.multi_img;
                }


                req.body.updatedDate = new Date().toLocaleString()
                var update = await product.findByIdAndUpdate(req.body.editId, req.body);
                if (update) {
                    return res.redirect("/admin/product/view_product")
                }
                else {
                    console.log("data not update");
                    return res.redirect("back")
                }
            }
            else {
                req.body.single_img = oldData.single_img;
                req.body.multi_img = oldData.multi_img;
                req.body.updatedDate = new Date().toLocaleString()

                var update = await product.findByIdAndUpdate(req.body.editId, req.body);
                if (update) {
                    return res.redirect("/admin/product/view_product")
                }
                else {
                    console.log("data not update");
                    return res.redirect("back")
                }

            }

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


// ----- delete many -----

module.exports.delete_many = async (req, res) => {
    try {

        req.body.deleteAll.map(async (v) => {
            var productData = await product.findById(v);
            if (productData) {
                if (productData.single_img) {
                    var fullPath = path.join(__dirname, "..", productData.single_img)
                    await fs.unlinkSync(fullPath)
                }
                if (productData.multi_img) {
                    productData.multi_img.map(async (v1) => {
                        var fullPath = path.join(__dirname, "..", v1);
                        await fs.unlinkSync(fullPath)
                    })
                }
            }
        })

        var abc = await product.deleteMany({ _id: { $in: req.body.deleteAll } });
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
