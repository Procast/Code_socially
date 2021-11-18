const Post=require("../models/post");


module.exports.home=function(req,res){

    console.log(req.cookies);
   

    Post.find({}).populate('user').exec(function(err,posts){
        if (err){
            console.log("Error in finding the posts");
            return;
        }

        return res.render('home',{
            title:'Home',
            posts:posts
        });
    });

    
};