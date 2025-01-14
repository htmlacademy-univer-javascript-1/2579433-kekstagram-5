import { createPictures } from "./pictures.js";
import { setupFullScreen } from "./fullscreen.js";
import { renderPhotos } from './api.js';
import { lengthCheck, isPalindrom, findDigits } from "./functions.js";

document.addEventListener("DOMContentLoaded", () => {
  renderPhotos();
  setupFullScreen();
});
