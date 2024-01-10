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


// ----- user model -----

var user = require("../models/user");


// ----- home -----

module.exports.home = async (req, res) => {
    try {
        var categoryData = await category.find({ isActive: true });
        var bg_white = ""
        if (categoryData) {
            return res.render("user/home", {
                categoryData: categoryData,
                bg_white: bg_white
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


// ----- single category -----

module.exports.single_category = async (req, res) => {
    try {
        var categoryData = await category.find({ isActive: true });
        var single_category = await category.findById(req.query.cat);
        var subCategoryData = await subcategory.find({ categoryId: req.query.cat, isActive: true })
        var extraCategoryData = await extracategory.find({ categoryId: req.query.cat, isActive: true })
        var productData = await product.find({ categoryId: req.query.cat, isActive: true }).populate("brandId").populate("typeId").exec()
        var max = Math.max(...productData.map(v => v.price));
        var min = Math.min(...productData.map(v => v.price));

        var brand_list = [];
        var type_list = [];
        productData.map((v) => {
            var pos = brand_list.findIndex(v1 => v1.id == v.brandId.id);
            if (pos == -1) {
                brand_list.push({ id: v.brandId.id, brand_name: v.brandId.brand_name })
            }
        })

        productData.map((v) => {
            var pos = type_list.findIndex(v1 => v1.id == v.typeId.id);
            if (pos == -1) {
                type_list.push({ id: v.typeId.id, type_name: v.typeId.type_name })
            }
        })
        var bg_white = "bg white"

        if (categoryData) {
            return res.render("user/single_category", {
                categoryData: categoryData,
                single_category: single_category,
                subCategoryData: subCategoryData,
                extraCategoryData: extraCategoryData,
                productData: productData,
                bg_white: bg_white,
                categoryId: req.query.cat,
                max: max,
                min: min,
                brand_list: brand_list,
                type_list: type_list
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


// ----- multi category -----

module.exports.multi_cat = async (req, res) => {
    try {
        var categoryData = await category.find({ isActive: true });
        var single_category = await category.findById(req.query.cat);
        var single_extracategory = await extracategory.findById(req.query.extracat);
        var subCategoryData = await subcategory.find({ categoryId: req.query.cat, isActive: true })
        var extraCategoryData = await extracategory.find({ categoryId: req.query.cat, isActive: true })
        var productData = await product.find({ categoryId: req.query.cat, subcategoryId: req.query.subcat, extracategoryId: req.query.extracat, isActive: true }).populate("brandId").populate("typeId").exec()
        var max = Math.max(...productData.map(v => v.price));
        var min = Math.min(...productData.map(v => v.price));

        var brand_list = [];
        var type_list = []
        productData.map((v) => {
            var pos = brand_list.findIndex(v1 => v1.id == v.brandId.id);
            if (pos == -1) {
                brand_list.push({ id: v.brandId.id, brand_name: v.brandId.brand_name })
            }
        })

        productData.map((v) => {
            var pos = type_list.findIndex(v1 => v1.id == v.typeId.id);
            if (pos == -1) {
                type_list.push({ id: v.typeId.id, type_name: v.typeId.type_name })
            }
        })

        var bg_white = "bg white"
        // console.log(single_extracategory)
        if (categoryData) {
            return res.render("user/multi_category", {
                categoryData: categoryData,
                single_category: single_category,
                single_extracategory: single_extracategory,
                subCategoryData: subCategoryData,
                extraCategoryData: extraCategoryData,
                productData: productData,
                bg_white: bg_white,
                categoryId: req.query.cat,
                subcategoryId: req.query.subcat,
                extracategoryId: req.query.extracat,
                max: max,
                min: min,
                brand_list: brand_list,
                type_list: type_list
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


// ----- single product -----

module.exports.single_product = async (req, res) => {
    try {
        var categoryData = await category.find({ isActive: true });
        var single_product = await product.findById(req.query.product).populate("categoryId").exec()
        var recent_productData = await product.find({ isActive: true }).sort({ "_id": -1 }).limit(4)
        // console.log(recentProductData)
        if (categoryData) {
            return res.render("user/single_product", {
                categoryData: categoryData,
                single_productData: single_productData,
                recent_productData: recent_productData
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


// ----- change cat price -----

module.exports.change_catprice = async (req, res) => {
    try {
        var productData = await product.find({ categoryId: req.body.categoryId, price: { $gte: parseInt(req.body.from), $lte: parseInt(req.body.to) }, isActive: true })

        var ajaxCatChange = ""
        if (productData) {
            var ajaxCatChangelength = productData.length;
            productData.map((v) => {
                ajaxCatChange += ` <div class="col-lg-4 col-sm-6">
                    <div class="single_category_product">
                        <div class="single_category_img">
                            <a href="/single_product/?product=${v.id}">
                                <img src="${v.single_img}" alt height="200" style="object-fit: cover;">
                            </a>
                            <div class="category_social_icon">
                                <ul>
                                    <li><a href="#"><i class="ti-heart"></i></a></li>
                                    <li><a href="#"><i class="ti-bag"></i></a></li>
                                </ul>
                            </div>
                            <div class="category_product_text">
                                <a href="/single_product/?product=${v.id}">
                                    <h5>
                                        ${v.title}
                                    </h5>
                                </a>
                                <p>₹ ${v.price}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>`
            })
            return res.json([ajaxCatChangelength, ajaxCatChange])
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


// ----- change multi cat price -----

module.exports.change_multicatprice = async (req, res) => {
    try {
        var productData = await product.find({ categoryId: req.body.categoryId, subcategoryId: req.body.subcategoryId, extracategoryId: req.body.extracategoryId, price: { $gte: parseInt(req.body.from), $lte: parseInt(req.body.to) }, isActive: true })

        var ajaxCatChange = ""
        if (productData) {
            var ajaxCatChangelength = productData.length;
            productData.map((v) => {
                ajaxCatChange += ` <div class="col-lg-4 col-sm-6">
                    <div class="single_category_product">
                        <div class="single_category_img">
                            <a href="/single_product/?product=${v.id}">
                                <img src="${v.single_img}" alt height="200" style="object-fit: cover;">
                            </a>
                            <div class="category_social_icon">
                                <ul>
                                    <li><a href="#"><i class="ti-heart"></i></a></li>
                                    <li><a href="#"><i class="ti-bag"></i></a></li>
                                </ul>
                            </div>
                            <div class="category_product_text">
                                <a href="/single_product/?product=${v.id}">
                                    <h5>
                                        ${v.title}
                                    </h5>
                                </a>
                                <p>₹ ${v.price}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>`
            })
            return res.json([ajaxCatChangelength, ajaxCatChange])
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


// ----- change cat brand -----

module.exports.change_catbrand = async (req, res) => {
    try {
        var productData = await product.find({ categoryId: req.body.categoryId, isActive: true })

        if (req.body.brandId != undefined) {
            productData = await product.find({ categoryId: req.body.categoryId, brandId: req.body.brandId, isActive: true })
        }
        var ajaxCatChange = ""
        if (productData) {
            var ajaxCatChangelength = productData.length;
            productData.map((v) => {
                ajaxCatChange += ` <div class="col-lg-4 col-sm-6">
                    <div class="single_category_product">
                        <div class="single_category_img">
                            <a href="/single_product/?product=${v.id}">
                                <img src="${v.single_img}" alt height="200" style="object-fit: cover;">
                            </a>
                            <div class="category_social_icon">
                                <ul>
                                    <li><a href="#"><i class="ti-heart"></i></a></li>
                                    <li><a href="#"><i class="ti-bag"></i></a></li>
                                </ul>
                            </div>
                            <div class="category_product_text">
                                <a href="/single_product/?product=${v.id}">
                                    <h5>
                                        ${v.title}
                                    </h5>
                                </a>
                                <p>₹ ${v.price}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>`
            })
            return res.json([ajaxCatChangelength, ajaxCatChange])
        }
    }
    catch (err) {
        console.log(err);
        return res.redirect("back")
    }
}


// ----- change multi cat brand -----

module.exports.change_multicatbrand = async (req, res) => {
    try {

        var productData = await product.find({ categoryId: req.body.categoryId, subcategoryId: req.body.subcategoryId, extracategoryId: req.body.extracategoryId, isActive: true })

        if (req.body.brandId != undefined) {
            productData = await product.find({ categoryId: req.body.categoryId, subcategoryId: req.body.subcategoryId, extracategoryId: req.body.extracategoryId, brandId: req.body.brandId, isActive: true })
        }

        var ajaxCatChange = ""
        if (productData) {
            var ajaxCatChangelength = productData.length;
            productData.map((v) => {
                ajaxCatChange += ` <div class="col-lg-4 col-sm-6">
                    <div class="single_category_product">
                        <div class="single_category_img">
                            <a href="/single_product/?product=${v.id}">
                                <img src="${v.single_img}" alt height="200" style="object-fit: cover;">
                            </a>
                            <div class="category_social_icon">
                                <ul>
                                    <li><a href="#"><i class="ti-heart"></i></a></li>
                                    <li><a href="#"><i class="ti-bag"></i></a></li>
                                </ul>
                            </div>
                            <div class="category_product_text">
                                <a href="/single_product/?product=${v.id}">
                                    <h5>
                                        ${v.title}
                                    </h5>
                                </a>
                                <p>₹ ${v.price}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>`
            })
            return res.json([ajaxCatChangelength, ajaxCatChange])
        }
    }
    catch (err) {
        console.log(err);
        return res.redirect("back")
    }
}


// ----- change cat type -----

module.exports.change_cattype = async (req, res) => {
    try {
        var productData = await product.find({ categoryId: req.body.categoryId, isActive: true })
        if (req.body.typeId != undefined) {
            productData = await product.find({ categoryId: req.body.categoryId, typeId: req.body.typeId, isActive: true })
        }
        var ajaxCatChange = ""
        if (productData) {
            var ajaxCatChangelength = productData.length;
            productData.map((v) => {
                ajaxCatChange += ` <div class="col-lg-4 col-sm-6">
                    <div class="single_category_product">
                        <div class="single_category_img">
                            <a href="/single_product/?product=${v.id}">
                                <img src="${v.single_img}" alt height="200" style="object-fit: cover;">
                            </a>
                            <div class="category_social_icon">
                                <ul>
                                    <li><a href="#"><i class="ti-heart"></i></a></li>
                                    <li><a href="#"><i class="ti-bag"></i></a></li>
                                </ul>
                            </div>
                            <div class="category_product_text">
                                <a href="/single_product/?product=${v.id}">
                                    <h5>
                                        ${v.title}
                                    </h5>
                                </a>
                                <p>₹ ${v.price}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>`
            })
            return res.json([ajaxCatChangelength, ajaxCatChange])
        }
    }
    catch (err) {
        console.log(err);
        return res.redirect("back")
    }
}


// ----- change multi cat type -----

module.exports.change_multicattype = async (req, res) => {
    try {

        var productData = await product.find({ categoryId: req.body.categoryId, subcategoryId: req.body.subcategoryId, extracategoryId: req.body.extracategoryId, isActive: true })

        if (req.body.typeId != undefined) {
            productData = await product.find({ categoryId: req.body.categoryId, subcategoryId: req.body.subcategoryId, extracategoryId: req.body.extracategoryId, typeId: req.body.typeId, isActive: true })
        }

        var ajaxCatChange = ""
        if (productData) {
            var ajaxCatChangelength = productData.length;
            productData.map((v) => {
                ajaxCatChange += ` <div class="col-lg-4 col-sm-6">
                    <div class="single_category_product">
                        <div class="single_category_img">
                            <a href="/single_product/?product=${v.id}">
                                <img src="${v.single_img}" alt height="200" style="object-fit: cover;">
                            </a>
                            <div class="category_social_icon">
                                <ul>
                                    <li><a href="#"><i class="ti-heart"></i></a></li>
                                    <li><a href="#"><i class="ti-bag"></i></a></li>
                                </ul>
                            </div>
                            <div class="category_product_text">
                                <a href="/single_product/?product=${v.id}">
                                    <h5>
                                        ${v.title}
                                    </h5>
                                </a>
                                <p>₹ ${v.price}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>`
            })
            return res.json([ajaxCatChangelength, ajaxCatChange])
        }
    }
    catch (err) {
        console.log(err);
        return res.redirect("back")
    }
}


// ----- log in page -----

module.exports.user_loginPage = async (req, res) => {
    try {
        var categoryData = await category.find({ isActive: true });
        var bg_white = "bg white"
        if (categoryData) {
            return res.render("user/user_loginPage", {
                categoryData: categoryData,
                bg_white: bg_white
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


// ----- login -----

module.exports.login = async (req, res) => {
    try {
       
        return res.redirect("/")
    }
    catch (err) {
        console.log(err);
        return res.redirect("back")
    }
}


// ----- register page -----

module.exports.user_registerPage = async (req, res) => {
    try {
        var categoryData = await category.find({ isActive: true });
        var bg_white = "bg white"
        if (categoryData) {
            return res.render("user/user_registerPage", {
                categoryData: categoryData,
                bg_white: bg_white
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


// ----- register -----

module.exports.register = async (req, res) => {
    try {
        var userData = await user.findOne({ email: req.body.email })
        if (userData) {
            console.log("email alredy exits")
            return res.redirect("back")
        }
        else {
            if (req.body.password == req.body.cpass) {
                req.body.role = "user";

                var insert = await user.create(req.body)
                if (insert) {
                    console.log("user inserted")
                    return res.redirect("/user_loginPage")
                }
                else {
                    console.log("user not inserted")
                    return res.redirect("back")
                }

            }
            else {
                console.log("both pass not match")
                return res.redirect("back")
            }
        }
    }
    catch (err) {
        console.log(err);
        return res.redirect("back")
    }
}