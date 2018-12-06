var express    = require("express");
var router     = express.Router();
var passport   = require("passport");
var User       = require("../models/user");

//Root Route
router.get("/", function(req, res){
   res.render("landing"); 
});


// ==================
// AUTH ROUTES
// ==================

// show register form
router.get("/register", function(req, res){
   res.render("register", {page: 'register'}); 
});

//handling sign up logic
router.post("/register", function(req, res){
   var newUser = new User({username: req.body.username});
   User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register", {error: err.message});
        }
       passport.authenticate("local")(req, res, function(){
           req.flash("success", "Welcome to NBACamp " + user.username);
            res.redirect("/campgrounds");
       });
    });
});

//show login form
router.get("/login", function(req, res){
   res.render("login", {page: 'login'}); 
});

//handling login logic
//app.post("/login", middleware, callback)
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }), function(req, res){
});

//logout route
router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "Logged out!");
    res.redirect("/campgrounds");
});


module.exports = router;