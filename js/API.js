export const fetchPhotos = async () => {
  const response = await fetch("https://29.javascript.htmlacademy.pro/kekstagram/data");
  if (!response.ok) {
    throw new Error(`Data error: ${response.statusText}`);
  }
  return await response.json();
};

export const sendPhoto = async (formData) => {
  const response = await fetch("https://29.javascript.htmlacademy.pro/kekstagram/data", {
    method: "POST",
    body: formData,
  });
  if (!response.ok) {
    throw new Error(`Data error: ${response.statusText}`);
  }
};

export const renderPhotos = async () => {
  const photos = await fetchPhotos();
  photos.forEach((photo) => {
    const photoElement = document.querySelector("#picture").content.cloneNode(true);
    photoElement.querySelector(".picture__img").src = photo.url;
    photoElement.querySelector(".picture__comments").textContent = photo.comments.length;
    photoElement.querySelector(".picture__likes").textContent = photo.likes;
    document.querySelector(".pictures").appendChild(photoElement);
  });
};
