const express=require('express');

const router=express.Router();

const passport=require('passport');


const postsController=require("../controllers/posts_controllers");

router.post('/create',passport.checkAuthentication,postsController.createPost);

router.get('/destroy/:id',passport.checkAuthentication,postsController.destroy);

module.exports=router;