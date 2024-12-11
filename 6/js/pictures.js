import { createPost } from "./tempObjectCreation.js";

const sketch = document.querySelector("#picture").content.querySelector(".picture");
const pictures = document.createDocumentFragment();

for (let i = 1; i < 25; i++) {
  const post = createPost(i);
  const picture = sketch.cloneNode(true);
  picture.querySelector("img").src = post.url;
  picture.querySelector("img").alt = post.description;
  picture.querySelector(".picture__likes").textContent = post.likes;
  picture.querySelector(".picture__comments").textContent = post.comments.length;
  pictures.appendChild(picture);
}

const gallery = document.querySelector(".pictures");
gallery.appendChild(pictures);
