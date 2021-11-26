{
let createPost=function(){
    let newPostForm=$('#new-post-form');

    newPostForm.submit(function(e){
        e.preventDefault();

        $.ajax({
            type:'POST',
            url:'/posts/create',
            data:newPostForm.serialize(),
            success: function(data){
                console.log(data);
                let newPost=newPostDom(data.data.post);
                $('#posts-container>ul').prepend(newPost);

                deletePost($(' .delete-post-button',newPost));

                 // call the create comment class
                 new PostComments(data.data.post._id);

                 new Noty({
                     theme: 'relax',
                     text: "Post published!",
                     type: 'success',
                     layout: 'topRight',
                     timeout: 1500
                     
                 }).show();
            },
            error: function(error){
                console.log(error.responsText);
            }
        });
    });
}

    let newPostDom=function(post){
        return $(`<li id="post-${post._id}">
        <p>
            
                <small>
                    <a class="delete-post-button" href="/posts/destroy/${post._id}">X</a>
                </small>
            
            ${post.content}
            <br>
            <small>
            ${post.user.name}
            </small>
            
        </p>
    
    
    
    <div class="post-comments">
        
            <form action="/comments/create" method="POST">
                <input type="text" name="content" placeholder="Enter comments" required>
                <input type="hidden" name="postid" value="${post._id}">
                <input type="submit" value="Add comment">
            </form>
    
        
    
    
        <div class="post-comments-list">
            <ul id="post-comments-${post._id }">
                
               
            </ul>
        </div>
    </div>
    </li>
    `);
    }


    let deletePost=function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type:'GET',
                url:$(deleteLink).prop('href'),
                success:function(data){
                    $(`#post-${data.data.post_id}`).remove();

                    new Noty({
                        theme: 'relax',
                        text: "Post Deleted",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();
                },error:function(error){
                    console.log(error.responsText);
                }
            });
        });
    }

    

    // loop over all the existing posts on the page (when the window loads for the first time) and call the delete post method on delete link of each, also add AJAX (using the class we've created) to the delete button of each
    let convertPostsToAjax = function(){
        $('#posts-list-container>ul>li').each(function(){
            let self = $(this);
            let deleteButton = $(' .delete-post-button', self);
            deletePost(deleteButton);

            // get the post's id by splitting the id attribute
            let postId = self.prop('id').split("-")[1]
            new PostComments(postId);
        });
    }


    createPost();
    convertPostsToAjax();
}