export function setupFullScreen(){
  const frame = document.querySelector(".big-picture");
  const gallery = document.querySelector(".pictures");
  const commentTemplate = frame.querySelector(".social__comment").cloneNode(true);
  const commentsLoader = frame.querySelector(".comments-loader");
  const commentCountBlock = frame.querySelector(".social__comment-count");
  const commentsContainer = frame.querySelector(".social__comments");

  let totalComments = 0;
  let shownComments = 0;

  gallery.addEventListener("click", showFrame);
  frame.querySelector("#picture-cancel").addEventListener("click", closeFrame);
  commentsLoader.addEventListener("click", loadComments);
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
      document.body.classList.add("modal-open");

      frame.querySelector(".big-picture__img").querySelector("img").src = element.querySelector("img").src;
      frame.querySelector(".likes-count").textContent = element.querySelector(".picture__likes").textContent;
      frame.querySelector(".comments-count").textContent = element.querySelector(".picture__comments").textContent;
      frame.querySelector(".social__caption").textContent = element.querySelector("img").alt;

      commentsContainer.innerHTML = "";
      totalComments = parseInt(element.querySelector(".picture__comments").textContent, 10);
      shownComments = 0;
      commentCountBlock.classList.remove("hidden");
      commentsLoader.classList.remove("hidden");

      loadComments();
    }
  }

  function closeFrame(){
    document.querySelector("body").classList.remove("modal-open");
    frame.classList.add("hidden");
    commentsLoader.removeEventListener("click", loadComments);
  }

  function loadComments() {
    const commentsFragment = document.createDocumentFragment();
    const commentsToLoad = Math.min(5, totalComments - shownComments);

    for (let i = 0; i < commentsToLoad; i++) {
      const comment = commentTemplate.cloneNode(true);
      commentsFragment.appendChild(comment);
    }

    commentsContainer.appendChild(commentsFragment);
    shownComments += commentsToLoad;

    commentCountBlock.textContent = `${shownComments} из ${totalComments} комментариев`;

    if (shownComments >= totalComments) {
      commentsLoader.classList.add("hidden");
    }
  }
}
