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
    if (req.cookies.user_id){
        User.findById(req.cookies.user_id,function(err,user){
            if(user){
                return res.render('user_profile',{
                    title:'user profile',
                    user:user
                });
            }else{
                return res.redirect('/users/signin');
            }
        });


    }else{
        return res.redirect('/users/signin');
    }


    
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
    User.findOne({email:req.body.email},function(err,user){
        if (err){
            console.log("error in finding user in signing in");
            return;
        }
        if (user){
            if (user.password != req.body.password){
                return res.redirect('back');
            }

            res.cookie('user_id',user.id);

            return res.redirect('/users/profile');


        }else{
            return res.redirect('back');
        }
        




    });
};

module.exports.signout=function(req,res){

    res.clearCookie('user_id');
    return res.redirect('/users/signin');
}