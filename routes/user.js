// ----- express -----

var express = require("express")


// ----- routes -----

var routes = express.Router()


// ----- user controller -----

var userController = require("../controllers/userController")


// ----- passport -----

var passport = require("passport")


// ----- home page -----

routes.get("/", userController.home)


// ----- single category -----

routes.get("/single_category", userController.single_category)


// ----- single product -----

routes.get("/single_product", userController.single_product)


// ----- change cat price -----

routes.post("/change_catprice", userController.change_catprice)


// ----- multi category -----

routes.get("/multi_cat", userController.multi_cat)


// ----- change multi cat price -----

routes.post("/change_multicatprice", userController.change_multicatprice)


// ----- change cat brand -----

routes.post("/change_catbrand", userController.change_catbrand)


// ----- change multi cat brand -----

routes.post("/change_multicatbrand", userController.change_multicatbrand)


// ----- change cat type -----

routes.post("/change_cattype", userController.change_cattype)


// ----- change multi cat type -----

routes.post("/change_multicattype", userController.change_multicattype)


// ----- log in page -----

routes.get("/user_loginPage", userController.user_loginPage)


// ----- login -----

routes.post("/login", passport.authenticate("user", { failureRedirect: "/user_loginPage" }), userController.login)


// ----- register page -----

routes.get("/user_registerPage", userController.user_registerPage)


// ----- register -----

routes.post("/register", userController.register)


// ----- cart page -----

routes.get("/cartPage", passport.checkUserAuth, userController.cartPage)


// ----- cart page -----

routes.post("/addCart", userController.addCart)


// ----- delete cart item -----

routes.post("/deleteItem", userController.deleteItem)


// ----- change quantity -----

routes.post("/changeQuantity", userController.changeQuantity)


// ----- export -----

module.exports = routes;