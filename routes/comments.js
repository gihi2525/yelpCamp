var express    = require("express"),
    router     = express.Router(),
    Campground = require("../models/campground"),
    Comment    = require("../models/comment"),
    middleware = require("../middleware");
    
router.get("/campgrounds/:id/comments/new", middleware.isLogedIn, function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        }else{
            res.render("comments/new", {campground: campground});
        }
    });
});

router.post("/campgrounds/:id/comments",middleware.isLogedIn, function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }else{
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                }else{
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
    });
});

//edit route
router.get("/campgrounds/:id/comments/:comment_id/edit", middleware.checkCommentOwenership, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComments){
        if(err){
            console.log("the comments id is:" + req.params.id);
            res.redirect("back");
        }else{
            res.render("comments/edit", {campground_id: req.params.id, comment: foundComments});
        }
    });
});

//update route
router.put("/campgrounds/:id/comments/:comment_id", middleware.checkCommentOwenership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            console.log(err);
            res.redirect("back");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

//destroy route
router.delete("/campgrounds/:id/comments/:comment_id", middleware.checkCommentOwenership, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, req.body.comment, function(err, removedComment){
        if(err){
            console.log(err);
            res.redirect("back");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

module.exports = router;
