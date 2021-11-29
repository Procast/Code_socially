const Post=require('../../../models/post');
const Comment=require('../../../models/comment');



module.exports.index=async function(req,res){



    let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        });
    
    
    return res.json(200,{
        message:'Lists of posts v1',
        posts:posts
    });
}


module.exports.destroy= async function(req,res){

    try{
        let post=await Post.findById(req.params.id);

        // if (post.user==req.user.id){
        post.remove()
    
        await Comment.deleteMany({post:req.params.id});

               
               
        // }else{
        //     req.flash('error','you cannot delete this post');
        //     return res.redirect('back');
        //     }
        return res.json(200,{
            message:"Post and associated comments deleted!"
        })
        
    }catch(err){

        return res.json(500,{
           message :'Internal server error!!'
        });
    }
   

}