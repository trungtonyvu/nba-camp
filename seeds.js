var mongoose    = require("mongoose");
var Campground  = require("./models/campground");
var Comment     = require("./models/comment");

var data = [
    {
        name: "Houston Rockets",
        image: "https://1lal3e4eckus2d9p8g17wl8c-wpengine.netdna-ssl.com/wp-content/uploads/2018/06/hou-1.png",
        description: "Run around the house at 4 in the morning catty ipsum. Eat a plant, kill a hand cat is love, cat is life for pee in the shoe, always hungry. Small kitty warm kitty little balls of fur crash against wall but walk away like nothing happened chew iPad power cord, so sniff sniff twitch tail in permanent irritation meow to be let in. Annoy kitten brother with poking hiding behind the couch until lured out by a feathery toy, or fooled again thinking the dog likes me chase dog then run away sniff catnip and act crazy and under the bed lie on your belly and purr when you are asleep."
    },
    {
        name: "Milwaukee Bucks", 
        image: "https://pbs.twimg.com/profile_images/993509737982582784/crJlwlWE_400x400.jpg",
        description: "I can haz eat an easter feather as if it were a bird then burp victoriously, but tender catty ipsum. Being gorgeous with belly side up love me! for really likes hummus so meow all night or adventure always, yet scratch at fleas, meow until belly rubs, hide behind curtain when vacuum cleaner is on scratch strangers and poo on owners food. Wake up human for food at 4am mark territory, so knock dish off table head butt cant eat out of my own dish for wake up human for food at 4am, hide head under blanket so no one can see yet prance along on top of the garden fence, annoy the neighbor's dog and make it bark for purr as loud as possible,"
    },
    {
        name: "Denver Nuggets",
        image: "https://sportslogohistory.com/wp-content/uploads/2018/04/denver_nuggets_teensonacid.png",
        description: "be the most annoying cat that you can, and, knock everything off the table. Chew the plant purr like an angel or meow all night having their mate disturbing sleeping humans jump around on couch, meow constantly until given food, . Stare out the window the cat was chasing the mouse catty ipsum so cats go for world domination."
    }
];

function seedDB(){
    //remove all campgrounds
    Campground.deleteMany({}, function(err){   //Campground.deleteMany() is used to remove deprecation warning (formerly Campground.remove()
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds!");
        //add a few campgrounds
        data.forEach(function(seed){
            Campground.create(seed, function(err, campground){
                if(err){
                    console.log(err);
                } else {
                    console.log("Added a campground!");
                    //add a few comments
                    Comment.create(
                        {
                            text: "Challengers to the Golden State Warriors",
                            author: "Tony"
                        }, function(err, comment){
                            if(err){
                                console.log(err);
                            } else {
                                campground.comments.push(comment);
                                campground.save();
                                console.log("Created a new comment!");
                            }
                        });
                }
            });  
        });
    });
}

module.exports = seedDB;