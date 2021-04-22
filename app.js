//npm packedges
var express        = require("express"),
    bodyParser     = require("body-parser"),
    mongoose       = require("mongoose"),
    passport       = require("passport"),
    LocalStrategy  = require("passport-local"),
    methodOverride = require("method-override"),
    flash   = require("connect-flash"),
    app            = express();

//routes config.
var indexRoutes      = require("./routes/index"),
    commentRoutes    = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds");

//DB Schema confog.
var User       = require("./models/user"),
    seedDB     = require("./seeds"),
    Campground = require("./models/campground"),
    Comment    = require("./models/comment");

//seedDB();
mongoose.connect("mongodb://localhost/yelp_camp");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

//PASSPORT CONFIG.
app.use(require("express-session")({
    secret: "yelpCampSecurity",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

//routes config
app.use(/*"/",*/ indexRoutes);
app.use(/*"/campgrounds",*/campgroundRoutes);
app.use(commentRoutes);

app.listen(3000, function(){
    console.log("yelpCamp web server has started");
});