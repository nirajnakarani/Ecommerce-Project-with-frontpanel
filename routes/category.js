// ----- express -----

var express = require("express");


// ----- routes -----

var routes = express.Router()


// ----- category model -----

var category = require("../models/category")


// ----- category controller -----

var categoryController = require("../controllers/categoryController")


// ----- add category page -----

routes.get("/add_category", categoryController.add_category)


// ----- insert category -----

routes.post("/insert_category", categoryController.insert_category)


// ----- view category page -----

routes.get("/view_category", categoryController.view_category)


// ----- set deactive -----

routes.get("/set_deactive", categoryController.set_deactive)


// ----- set active -----

routes.get("/set_active", categoryController.set_active)


// ----- edit category -----

routes.get("/edit_category", categoryController.edit_category)


// ----- update category -----

routes.post("/update_category", categoryController.update_category)


// ----- delete many -----

routes.post("/delete_many", categoryController.delete_many)


// ----- export -----

module.exports = routes;
