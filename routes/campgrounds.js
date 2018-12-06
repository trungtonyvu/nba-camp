var express = require("express");
var router  = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware"); //index.js is a special name; not required to be written after "middleware/" because of special name

//INDEX - show all campgrounds
router.get("/", function(req, res){
    // Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
       if(err){
           console.log(err);
       } else {
          res.render("campgrounds/index",{campgrounds: allCampgrounds, page: 'campgrounds'});
       }
    });
});

// CREATE - add new campground to DB
router.post("/", middleware.isLoggedIn, function(req, res){
   // get data from form and add to campgrounds array
   var name = req.body.name;
   var valuation = req.body.valuation;
   var image = req.body.image;
   var desc = req.body.description;
   var author = {
       id : req.user._id,
       username : req.user.username
   };
   var newCampground = {name: name, valuation: valuation, image: image, description: desc, author:author};
   //Create a new campground and save to DB
   Campground.create(newCampground, function(err, newlyCreated){
       if(err){
           console.log(err);
       } else {
           // redirect back to campgrounds page
           console.log(newlyCreated);
           res.redirect("/campgrounds");
       }
   });
});

//NEW - show form to create new campground
router.get("/new", middleware.isLoggedIn, function(req, res){
   res.render("campgrounds/new"); 
});

//SHOW - shows more info about one campground
//make sure this route is below the "//NEW route" above 
router.get("/:id", function(req, res){
    //find campground with provided ID, populating the comments on that campground, executing this query we made, inside of foundCampground should now be comments
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
       if(err){
           console.log(err);
       } else {
           console.log(foundCampground);
        //render show template with that campground
           res.render("campgrounds/show", {campground: foundCampground});
       }
    });
});

// EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){   // "/campgrounds" not needed because of adding campgroundRoutes after "/campgrounds"
    Campground.findById(req.params.id, function(err, foundCampground){
        res.render("campgrounds/edit", {campground: foundCampground});
    });
});

// UPDATE CAMPGROUND ROUTE
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
    // find and update the correct campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){      //"req.body.campground" = name, image, description all nested in an object to be used here (found in edit.ejs file)
        if(err){
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

// DESTROY CAMPGROUND ROUTE
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){  //"/campgrounds" not required as part of line 47 app.js file
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds");
        }
    });
});


module.exports = router;