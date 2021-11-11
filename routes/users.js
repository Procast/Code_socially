const express=require('express');

const router=express.Router();

const userController=require('../controllers/users_controller');



router.get('/profile',userController.profile);

router.get('/post',userController.post);

router.get('/signup',userController.signup);

router.get('/signin',userController.signin);

router.post('/create-user',userController.createUser);

router.post('/create-session',userController.createSession);

router.post('/signout',userController.signout);


module.exports=router;