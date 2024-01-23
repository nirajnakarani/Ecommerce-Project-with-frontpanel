// ----- passport -----

var passport = require("passport");


// ----- strategy -----

var GoogleStrategy = require('passport-google-oauth20').Strategy;


// ----- admin model -----

var admin = require("../models/admin");


// ----- bcrypt-----

var bcrypt = require("bcrypt")


// ----- use sratategy -----

passport.use(new GoogleStrategy({
    clientID: "732482891906-ioi6ppc1ovked046k1r0bkoghmn03tbu.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:9090/admin/google/callback"
},
    async function (accessToken, refreshToken, profile, cb) {
        var checkEmail = await admin.findOne({ email: profile.emails[0].value })
        if (checkEmail) {
            return cb(null, checkEmail)
        }
        else {
            var adminData = {
                name: profile.displayName,
                email: profile.emails[0].value,
                password: await bcrypt.hash("12345", 10),
                role: "admin"
            }
            var insert = await admin.create(adminData);
            if(insert){
               return cb(null,insert)
            }
            else{
                return cb(null,false)
            }
        }
    }
));
