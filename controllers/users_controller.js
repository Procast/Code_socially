const User=require('../models/user');
const fs=require('fs');
const path=require('path');


module.exports.signup=function(req,res){
    if (req.isAuthenticated()){
        return res.redirect("/users/profile");
    }

    return res.render('user_signup',{
        title:'user signup'
    });
};

module.exports.signin=function(req,res){
    if (req.isAuthenticated()){
        return res.redirect("/users/profile");
    }

    return res.render('user_signin',{
        title:'user signin'
    });
};


module.exports.profile=function(req,res){
    User.findById(req.params.id,function(err,user){
        return res.render('user_profile',{
            title:'user profile',
            profile_user:user
        });
    });
    
};

module.exports.update=async function(req,res){
    if(req.user.id==req.params.id){
        try{
            let user=await User.findById(req.params.id);
            
            User.uploadedAvatar(req,res,function(err){
                if (err){console.log('****multer error :',err);return;}

                


                user.name=req.body.name;
                user.email=req.body.email;

                if(req.file){
                    if (user.avatar){
                        fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                    }

                    user.avatar=User.avatarPath + '/'+req.file.filename;
                }

                user.save();
                return res.redirect('back');
            });

        }catch(err){
            req.flash('error',err);
            return res.redirect('back');
        }
    }else{
        req.flash('error','Not authorized to update');
        return res.status(401).send('Unauthorized');
    }
}

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
                req.flash('success','Sign up is successfull');
                return res.redirect('/users/signin');
            });
        }else{
            req.flash('error','Error in sign up');
            return res.redirect('back');
        }
    })
};

module.exports.createSession=function(req,res){
    req.flash('success',"Logged in succesfully.");
    return res.redirect('/');
};

module.exports.destroySession=function(req,res){
    
    req.logout();
    req.flash('success',"Logged out succesfully.");
    return res.redirect('/');
}