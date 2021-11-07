module.exports.profile=function(req,res){
    return res.render('user_profile',{
        title:'user profile'
    });
};

module.exports.post=function(req,res){
    return res.render('user_post',{
        title:'user post'
    });
};