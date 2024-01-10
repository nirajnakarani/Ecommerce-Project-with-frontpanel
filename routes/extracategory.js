// ----- express -----

var express = require("express");


// ----- routes -----

var routes = express.Router()


// ----- extra category model -----

var extracategory = require("../models/extracategory")


// ----- extra category controller -----

var extracategoryController = require("../controllers/extracategoryController")


// ----- add extracategory page -----

routes.get("/add_extracategory", extracategoryController.add_extracategory)


// ----- insert extracategory -----

routes.post("/insert_extracategory", extracategoryController.insert_extracategory)


// ----- view extracategory page -----

routes.get("/view_extracategory", extracategoryController.view_extracategory)


// ----- set deactive -----

routes.get("/set_deactive", extracategoryController.set_deactive)


// ----- set active -----

routes.get("/set_active", extracategoryController.set_active)


// ----- edit extracategory -----

routes.get("/edit_extracategory", extracategoryController.edit_extracategory)


// ----- update extracategory -----

routes.post("/update_extracategory", extracategoryController.update_extracategory)


// ----- delete many -----

routes.post("/delete_many", extracategoryController.delete_many)


// ----- get extra category -----

routes.post("/getextracat", extracategoryController.getextracat)


// ----- get brand type -----

routes.post("/getbrandType", extracategoryController.getbrandType)


// ----- export -----

module.exports = routes;
