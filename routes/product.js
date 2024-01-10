// ----- express -----

var express = require("express");


// ----- routes -----

var routes = express.Router()


// ----- product model -----

var product = require("../models/product")


// ----- product controller -----

var productController = require("../controllers/productController")


// ----- add product page -----

routes.get("/add_product", productController.add_product)


// ----- insert product -----

routes.post("/insert_product", product.uploadproductImg, productController.insert_product)


// ----- view product page -----

routes.get("/view_product", productController.view_product)


// ----- set deactive -----

routes.get("/set_deactive", productController.set_deactive)


// ----- set active -----

routes.get("/set_active", productController.set_active)


// ----- deleteSpecificImg -----

routes.post("/deleteSpecificImg", productController.deleteSpecificImg)


// ----- delete product -----

routes.get("/delete_product", productController.delete_product)


// ----- edit product -----

routes.get("/edit_product", productController.edit_product)


// ----- update product -----

routes.post("/update_product",product.uploadproductImg, productController.update_product)


// ----- delete many -----

routes.post("/delete_many", productController.delete_many)


// ----- export -----

module.exports = routes;
