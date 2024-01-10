// ----- passport -----

var passport = require("passport")


// ----- passport local -----

var passportLocal = require("passport-local").Strategy


// ----- admin model -----

var admin = require("../models/admin");


// ----- user model -----

var user = require("../models/user");


// ----- create admin new object -----

passport.use(new passportLocal({
    usernameField: "email"
}, async (email, password, done) => {

    var adminData = await admin.findOne({ email: email });

    if (adminData) {
        if (adminData.password == password) {
            return done(null, adminData)
        }
        else {
            return done(null, false)
        }
    }
    else {
        return done(null, false)
    }

}))


// ----- create user new object -----

passport.use("user", new passportLocal({
    usernameField: "email"
}, async (email, password, done) => {

    var userData = await user.findOne({ email: email });

    if (userData) {
        if (userData.password == password) {
            return done(null, userData)
        }
        else {
            return done(null, false)
        }
    }
    else {
        return done(null, false)
    }

}))


// ----- serializeUser -----

passport.serializeUser(async (user, done) => {

    return done(null, user.id)

})


// ----- deserializeUser -----

passport.deserializeUser(async (id, done) => {

    var adminData = await admin.findById(id);
    var userData = await user.findById(id)
    if (adminData) {
        return done(null, adminData)
    }
    else if (userData.role == "user") {
        return done(null, userData)
    }
    else {
        return done(null, false)
    }

})


// ----- set Auth -----

passport.setAuth = function (req, res, next) {
    if (req.isAuthenticated()) {
        if (req.user.role == "admin") {
            res.locals.user = req.user;
        }
        else {
            res.locals.userData = req.user
        }
    }
    return next()
}


// ----- check Auth -----

passport.chekAuth = function (req, res, next) {
    if (req.isAuthenticated()) {
        if (req.user.role == "admin") {
            next()
        }
        else {
            return res.redirect("/")
        }
    }
    else {
        return res.redirect("/admin/")
    }
}