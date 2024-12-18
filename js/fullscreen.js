export function setupFullScreen(){
  const frame = document.querySelector(".big-picture");
  const gallery = document.querySelector(".pictures");

  gallery.addEventListener("click", showFrame);
  frame.querySelector("#picture-cancel").addEventListener("click", closeFrame);
  document.addEventListener("keydown", (evt) => {
    if(evt.key === "Escape" && !frame.classList.contains("hidden")) {
      closeFrame(evt);
    }
  });

  function showFrame(evt) {
    const element = evt.target.closest(".picture");
    if(element){
      evt.preventDefault();
      frame.classList.remove("hidden");
      frame.querySelector(".big-picture__img").querySelector("img").src = element.querySelector("img").src;
      frame.querySelector(".likes-count").textContent = element.querySelector(".picture__likes").textContent;
      frame.querySelector(".comments-count").textContent = element.querySelector(".picture__comments").textContent;
      frame.querySelector(".social__caption").textContent = element.querySelector("img").alt;
      const comments = document.createDocumentFragment();
      for(let i = 0; i < parseInt(frame.querySelector(".comments-count").textContent, 10); i++){
        const comment = frame.querySelector(".social__comment").cloneNode(true);
        comments.appendChild(comment);
      }
      frame.querySelector(".social__comments").innerHTML = "";
      frame.querySelector(".social__comments").appendChild(comments);
      frame.querySelector(".social__comment-count").classList.add("hidden");
      frame.querySelector(".comments-loader").classList.add("hidden");
      document.querySelector("body").classList.add("modal-open");
    }
  }

  function closeFrame(){
    document.querySelector("body").classList.remove("modal-open");
    frame.classList.add("hidden");
  }
}
