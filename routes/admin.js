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


// ----- login via google -----

routes.get('/google', passport.authenticate('google', { scope: ['profile', "email"] }));


// ----- login admin check google -----

routes.get('/google/callback', passport.authenticate('google', { failureRedirect: '/admin/' }), adminController.login_admin)


// ----- dashboard -----

routes.get("/dashboard", passport.checkAuth, adminController.dashboard)


// ----- add admin page -----

routes.get("/add_admin", passport.checkAuth, adminController.add_admin)


// ----- insert admin -----

routes.post("/insert_admin", admin.uploadAdminImg, adminController.insert_admin)


// ----- view admin page -----

routes.get("/view_admin", passport.checkAuth, adminController.view_admin)


// ----- set deactive -----

routes.get("/set_deactive", adminController.set_deactive)


// ----- set active -----

routes.get("/set_active", adminController.set_active)


// ----- delete admin -----

routes.get("/delete_admin", adminController.delete_admin)


// ----- delete many -----

routes.post("/delete_many", adminController.delete_many)


// ----- edit admin -----

routes.get("/edit_admin", passport.checkAuth, adminController.edit_admin)


// ----- update admin -----

routes.post("/update_admin", admin.uploadAdminImg, adminController.update_admin)


// ----- profile -----

routes.get("/profile", passport.checkAuth, adminController.profile)


// ----- change password page -----

routes.get("/change_password", passport.checkAuth, adminController.change_password)


// ----- update password -----

routes.post("/update_password", adminController.update_password)


// ----- logout -----

routes.get("/logout", passport.checkAuth, adminController.logout)


// ----- reset page -----

routes.get("/resetPage", adminController.resetPage)


// ----- send mail -----

routes.post("/sendMail", adminController.sendMail)


// ----- check OTP -----

routes.post("/checkOtp", adminController.checkOtp)


// ----- check new pass -----

routes.post("/checknewPass", adminController.checknewPass)


// ----- category -----

routes.use("/category", passport.checkAuth, require("./category"))


// ----- sub category -----

routes.use("/subcategory", passport.checkAuth, require("./subcategory"))


// ----- extra category -----

routes.use("/extracategory", passport.checkAuth, require("./extracategory"))


// ----- brand -----

routes.use("/brand", passport.checkAuth, require("./brand"))


// ----- type -----

routes.use("/type", passport.checkAuth, require("./type"))


// ----- product -----

routes.use("/product", passport.checkAuth, require("./product"))


// ----- export -----

module.exports = routes;
