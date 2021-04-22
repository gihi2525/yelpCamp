// var mongoose = require("mongoose");
// var Campground = require("./models/campground");
// var Comment = require("./models/comment");
// var data = [
//     {
//         name: "Somewhere in British Colombia, Canada",
//         image: "https://thetravellingmom.ca/wp-content/uploads/2015/03/Camper.jpg",
//         description: "blah blah blah"
//     },
    
//     {
//         name: "Somewhere in Alabama, USA",
//         image: "https://static.rootsrated.com/image/upload/s--57yGFSjg--/t_rr_large_traditional/hk4f6bggvuv1imvxfz1h.jpg",
//         description: "blah blah blah"
//     },
//     {
//         name: "Somewhere in Maxico",
//         image: "https://assets.simpleviewinc.com/simpleview/image/upload/c_limit,h_445,q_70,w_660/v1/clients/newmexico/james_foley_1271_58973F7C_7081_4871_91CE142C50C1339E_958a2d7d_c9d4_47b7_8e0d85824f79c4dd_1__7a9525b3-7e6f-4051-b081-8c74cc419dd1.jpg",
//         description: "blah blah blah"
//     }
// ];

// // remove all campgrounds
// function seedDB(){
//     //remove old DB
//     Campground.remove({}, function(err){
//         if(err){
//             console.log(err);
//         }
//         console.log("campground DB removed");
//         Comment.remove({}, function(err){
//             if(err){
//                 console.log(err);
//             }
//             console.log("comment DB removed");
//             //add new campground DB
//             data.forEach(function(seed){
//                 Campground.create(seed, function(err, campground){
//                     if(err){
//                         console.log(err);
//                     }
//                         console.log("new campgound added");
//                         Comment.create(
//                             {
//                                 text: "graet place",
//                                 author: "Homer"
//                              }, function(err, comment){
//                                 if(err){
//                                     console.log(err);
//                                 }else{
//                                     campground.comment.push(comment);
//                                     campground.save();
//                                     console.log("new comment added");
//                                 }
//                         });
//                 });
//             });
//         });
//     });
// }



// module.exports = seedDB;

var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment   = require("./models/comment");
 
var data = [
    {
        name: "Cloud's Rest", 
        image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Desert Mesa", 
        image: "https://farm6.staticflickr.com/5487/11519019346_f66401b6c1.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Canyon Floor", 
        image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    }
];
 
function seedDB(){
   //Remove all campgrounds
   Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds!");
        Comment.remove({}, function(err) {
            if(err){
                console.log(err);
            }
            console.log("removed comments!");
             //add a few campgrounds
            data.forEach(function(seed){
                Campground.create(seed, function(err, campground){
                    if(err){
                        console.log(err);
                    } else {
                        console.log("added a campground");
                        //create a comment
                        Comment.create(
                            {
                                text: "This place is great, but I wish there was internet",
                                author: "Homer"
                            }, function(err, comment){
                                if(err){
                                    console.log(err);
                                } else {
                                    campground.comments.push(comment);
                                    campground.save();
                                    console.log("Created new comment");
                                }
                            });
                    }
                });
            });
        });
    }); 
    //add a few comments
}
 
module.exports = seedDB;