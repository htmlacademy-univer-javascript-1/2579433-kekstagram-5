import { createPost } from "./tempObjectCreation.js";

const constructTask = function(){
  for(let i = 1; i <= 25; i++){
    const post = createPost(i);
    console.log(post);
    console.log(post.comments);
  }
};
