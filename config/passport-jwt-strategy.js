const passport=require('passport');
const JwtStrategy=require('passport-jwt').Strategy;
const ExtractJwt=require('passport-jwt').ExtractJwt;

const User=require('../models/user');

    let opts={
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey:'codial'
    }
    
    passport.use(new JwtStrategy(opts, function(jwtPayload,done){
    
        User.findById(jwtPayload._id,function(err,user){
            if (err){console.log("Error in finding user from JWT");return;}
    
            if(user){
                return done(null,user);
            }else{
    
                return done(null,false);
            }
    
        });
    }));


    





module.exports=passport;