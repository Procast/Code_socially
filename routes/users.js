const express=require('express');

const router=express.Router();

const passport=require('passport');

const userController=require('../controllers/users_controller');

const User =require('../models/user');



router.get('/profile/:id',passport.checkAuthentication,userController.profile);

router.post('/update/:id',passport.checkAuthentication,userController.update);

router.get('/signup',userController.signup);

router.get('/signin',userController.signin);

router.post('/create-user',userController.createUser);

router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/users/signin'}
),userController.createSession);

router.get('/signout',userController.destroySession);

module.exports=router;