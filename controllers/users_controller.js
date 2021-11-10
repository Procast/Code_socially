const User=require('../models/user');



module.exports.post=function(req,res){
    return res.render('user_post',{
        title:'user post'
    });
};

module.exports.signup=function(req,res){
    return res.render('user_signup',{
        title:'user signup'
    });
};

module.exports.signin=function(req,res){
    return res.render('user_signin',{
        title:'user signin'
    });
};


module.exports.profile=function(req,res){
    return res.render('user_profile',{
        title:'user profile'
    });
};



module.exports.createUser=function(req,res){

    
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email:req.body.email},function(err,user){
        if(err){
            console.log("error in finding user in signing up");
            return;
        }

        if (!user){
            User.create(req.body,function(err,user){
                if(err){
                    console.log("error in creating user while signing up");
                    return;
                }

                return res.redirect('/users/signin');
            });
        }else{
            return res.redirect('back');
        }
    })
};

module.exports.createSession=function(req,res){

};