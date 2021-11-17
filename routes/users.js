const express=require('express');

const router=express.Router();

const passport=require('passport');

const userController=require('../controllers/users_controller');



router.get('/profile',passport.checkAuthentication,userController.profile);

router.get('/post',passport.checkAuthentication,userController.post);

router.get('/signup',userController.signup);

router.get('/signin',userController.signin);

router.post('/create-user',userController.createUser);

router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/users/signin'}
),userController.createSession);

router.get('/signout',userController.destroySession);

module.exports=router;