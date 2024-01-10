// ----- express -----

var express = require("express");


// ----- routes -----

var routes = express.Router()


// ----- admin model -----

var admin = require("../models/admin")


// ----- admin controller -----

var adminController = require("../controllers/adminController")


// ----- passport -----

var passport = require("passport")


// ----- login -----

routes.get("/", adminController.login)


// ----- login admin -----

routes.post("/login_admin", passport.authenticate("local", { failureRedirect: "/admin/" }), adminController.login_admin)


// ----- dashboard -----

routes.get("/dashboard", passport.chekAuth, adminController.dashboard)


// ----- add admin page -----

routes.get("/add_admin", passport.chekAuth, adminController.add_admin)


// ----- insert admin -----

routes.post("/insert_admin", admin.uploadAdminImg, adminController.insert_admin)


// ----- view admin page -----

routes.get("/view_admin", passport.chekAuth, adminController.view_admin)


// ----- set deactive -----

routes.get("/set_deactive", adminController.set_deactive)


// ----- set active -----

routes.get("/set_active", adminController.set_active)


// ----- delete admin -----

routes.get("/delete_admin", adminController.delete_admin)


// ----- delete many -----

routes.post("/delete_many", adminController.delete_many)


// ----- edit admin -----

routes.get("/edit_admin", passport.chekAuth, adminController.edit_admin)


// ----- update admin -----

routes.post("/update_admin", admin.uploadAdminImg, adminController.update_admin)


// ----- profile -----

routes.get("/profile", passport.chekAuth, adminController.profile)


// ----- change password page -----

routes.get("/change_password", passport.chekAuth, adminController.change_password)


// ----- update password -----

routes.post("/update_password",adminController.update_password)


// ----- logout -----

routes.get("/logout", passport.chekAuth, adminController.logout)


// ----- reset page -----

routes.get("/resetPage", adminController.resetPage)


// ----- send mail -----

routes.post("/sendMail", adminController.sendMail)


// ----- check OTP -----

routes.post("/checkOtp", adminController.checkOtp)


// ----- check new pass -----

routes.post("/checknewPass", adminController.checknewPass)


// ----- category -----

routes.use("/category", passport.chekAuth, require("./category"))


// ----- sub category -----

routes.use("/subcategory", passport.chekAuth, require("./subcategory"))


// ----- extra category -----

routes.use("/extracategory", passport.chekAuth, require("./extracategory"))


// ----- brand -----

routes.use("/brand", passport.chekAuth, require("./brand"))


// ----- type -----

routes.use("/type", passport.chekAuth, require("./type"))


// ----- product -----

routes.use("/product", passport.chekAuth, require("./product"))


// ----- export -----

module.exports = routes;
