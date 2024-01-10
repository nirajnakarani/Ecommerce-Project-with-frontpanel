// ----- express -----

var express = require("express");


// ----- server -----

var app = express()


// ----- port -----

var port = 9090;


// ----- db -----

var db = require("./configs/mongoose")
// const mongoose = require("mongoose")
// mongoose.connect(`mongodb+srv://nakaraniniraj87580:niraj123@cluster0.oic2jbm.mongodb.net/`)
//     .then(() => console.log('Database Connected'))
//     .catch((err) => console.log(err));


// ----- path -----

var path = require("path")


// ----- view engine ejs -----

app.set("view engine", "ejs")


// ----- view static path -----

app.set("views", path.join(__dirname, "views"))


// ----- assets static path -----

app.use(express.static(path.join(__dirname, "assets")))


// ----- user assets static path -----

app.use(express.static(path.join(__dirname, "user_assets")))


// ----- uploads static path -----

app.use("/uploads", express.static(path.join(__dirname, "uploads")))


// ----- encoded -----

app.use(express.urlencoded())


// ----- cookie pasrser -----

var cookieParser = require("cookie-parser");

app.use(cookieParser())


// ----- passport -----

var passport = require("passport")


// ----- passport local -----

var passportLocal = require("./configs/passport-local")


// ----- session -----

var session = require("express-session");


// ----- session object -----

app.use(session({
    name: "niraj",
    secret: "niraj",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 100
    }
}));


// ----- passport initilization -----

app.use(passport.initialize())


// ----- passport session -----

app.use(passport.session())


// ----- set session data -----

app.use(passport.setAuth)


// ----- user routing -----

app.use("/", require("./routes/user"))


// ----- admin routing -----

app.use("/admin", require("./routes/admin"))


// ----- server connection -----

app.listen(port, (err) => {
    err ? console.log(err) : console.log(`server running on port ${port}`)
})