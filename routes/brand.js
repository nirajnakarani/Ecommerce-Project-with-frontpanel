// ----- express -----

var express = require("express");


// ----- routes -----

var routes = express.Router()


// ----- brand model -----

var brand = require("../models/brand")


// ----- brand controller -----

var brandController = require("../controllers/brandController")


// ----- add brand page -----

routes.get("/add_brand", brandController.add_brand)


// ----- insert brand -----

routes.post("/insert_brand", brandController.insert_brand)


// ----- view brand page -----

routes.get("/view_brand", brandController.view_brand)


// ----- set deactive -----

routes.get("/set_deactive", brandController.set_deactive)


// ----- set active -----

routes.get("/set_active", brandController.set_active)


// ----- edit brand -----

routes.get("/edit_brand", brandController.edit_brand)


// ----- update brand -----

routes.post("/update_brand", brandController.update_brand)


// ----- delete many -----

routes.post("/delete_many", brandController.delete_many)


// ----- export -----

module.exports = routes;
