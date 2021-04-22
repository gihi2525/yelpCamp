var express    = require("express"),
    router     = express.Router(),
    Campground = require("../models/campground"),
    middleware = require("../middleware");

router.get("/campgrounds", function(req, res){
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds/campgrounds", {campgrounds: allCampgrounds});
        }
    });
});

router.post("/campgrounds", function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var price = req.body.price;
    var description = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newCampGround = {name: name, price: price, image: image, description: description, author: author};
    Campground.create(newCampGround, function(err, newlyCreated){
        if(err){
            console.log(err);
        }else{
            res.redirect("/campgrounds");
        }
    });
});

router.get("/campgrounds/new",middleware.isLogedIn, function(req, res){
    res.render("campgrounds/new");
});

router.get("/campgrounds/:id", function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
            console.log(foundCampground);
        }else{
            console.log(foundCampground);
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

//update campgrounds
router.get("/campgrounds/:id/edit",middleware.checkCampgroundOwenership, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        res.render("campgrounds/edit", {campground: foundCampground});
    });
});

router.put("/campgrounds/:id",middleware.checkCampgroundOwenership, function(req, res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if(err){
            console.log(err);
        }else{
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

//destry campground
router.delete("/campgrounds/:id",middleware.checkCampgroundOwenership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err, removedCampground){
        if(err){
            console.log(err);
        }else{
            res.redirect("/campgrounds/");
        }
    });
});

module.exports = router;
