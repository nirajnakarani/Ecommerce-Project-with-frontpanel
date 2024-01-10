// ----- express -----

var express = require("express");


// ----- routes -----

var routes = express.Router()


// ----- type model -----

var type = require("../models/type")


// ----- type controller -----

var typeController = require("../controllers/typeController")


// ----- add type page -----

routes.get("/add_type", typeController.add_type)


// ----- insert type -----

routes.post("/insert_type", typeController.insert_type)


// ----- view type page -----

routes.get("/view_type", typeController.view_type)


// ----- set deactive -----

routes.get("/set_deactive", typeController.set_deactive)


// ----- set active -----

routes.get("/set_active", typeController.set_active)


// ----- edit type -----

routes.get("/edit_type", typeController.edit_type)


// ----- update type -----

routes.post("/update_type", typeController.update_type)


// ----- delete many -----

routes.post("/delete_many", typeController.delete_many)


// ----- export -----

module.exports = routes;
