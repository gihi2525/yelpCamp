var express  = require("express"),
    router   = express.Router(),
    passport = require("passport"),
    User     = require("../models/user");


router.get("/", function(req, res){
    res.render("campgrounds/landingPage");
});


//==========================
//AUTH ROUTES
//==========================

router.get("/register", function(req, res){
    res.render("register");
});

router.post("/register", function(req, res){
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register", {"error": err.message});
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "welcome " + user.username + " Yelp Camp");
            res.redirect("/campgrounds");
        });
    });
});

router.get("/login", function(req, res){
    res.render("login");
});

router.post("/login",passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), function(req, res){});

router.get("/logout", function(req, res){
    req.flash("success", "you have loged out")
    req.logout();
    res.redirect("/");
});


module.exports = router;

