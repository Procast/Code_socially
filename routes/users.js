const express=require('express');

const router=express.Router();

const userController=require('../controllers/users_controller');



router.get('/profile',userController.profile);

router.get('/post',userController.post);

router.get('/signup',userController.signup);

router.get('/signin',userController.signin);

router.post('/users/create-user',userController.createUser);


module.exports=router;