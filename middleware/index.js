//all middlewares goes here
const Campground = require("../models/campground");
const Comment = require("../models/comment");


var middlewareObj = {};

middlewareObj.checkCommentOwenership = function(req, res, next){
    if(req.isAuthenticated()){
        next();
    }else{
        res.redirect("back");
    }
}

middlewareObj.checkCampgroundOwenership = function(req, res, next){
    if(req.isAuthenticated()){
        next();
    }else{
        res.redirect("back");
    }
}

middlewareObj.isLogedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "Please Login first!")
    res.redirect("/login");
}


module.exports = middlewareObj;