const uploadForm = document.querySelector("#upload-select-image");

const openForm = () => {
  uploadForm.querySelector(".img-upload__overlay").classList.remove("hidden");
  document.body.classList.add("modal-open");
};

const closeForm = () => {
  uploadForm.querySelector(".img-upload__overlay").classList.add("hidden");
  document.body.classList.remove("modal-open");
  uploadForm.reset();
};

const validateHashtags = (value) => {
  if (!value.trim()){
    return true;
  }
  const hashtags = value.trim().toLowerCase().split(/\s+/);
  const uniqueHashtags = new Set(hashtags);
  return hashtags.length <= 5 && hashtags.every((tag) => /^#[a-zа-яё0-9]{1,19}$/.test(tag)) && hashtags.length === uniqueHashtags.size;
};

const validateDescription = (value) => value.length <= 140;

const pristine = new Pristine(uploadForm, {
  classTo: "img-upload__field-wrapper",
  errorTextParent: "img-upload__field-wrapper",
  errorTextClass: "text__error",
});

pristine.addValidator(
  uploadForm.querySelector(".text__hashtags"),
  validateHashtags,
  "Incorrect hashtag"
);

pristine.addValidator(
  uploadForm.querySelector(".text__description"),
  validateDescription,
  "Too long comment"
);

uploadForm.querySelector(".img-upload__input").addEventListener("change", openForm);
uploadForm.querySelector(".img-upload__cancel").addEventListener("click", closeForm);

const showSuccessMessage = () => {
  const template = document.querySelector("#success").content.cloneNode(true);
  const successMessage = template.querySelector(".success");
  document.body.appendChild(successMessage);
  successMessage.addEventListener("click", (event) => {
    if (event.target.closest(".success__inner") === null || event.target.matches(".success__button")) {
      successMessage.remove();
    }
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      successMessage.remove();
    }
  });
};

const showErrorMessage = () => {
  const template = document.querySelector("#error").content.cloneNode(true);
  const errorMessage = template.querySelector(".error");
  document.body.appendChild(errorMessage);
  errorMessage.addEventListener("click", (event) => {
    if (event.target.closest(".error__inner") === null || event.target.matches(".error__button")) {
      errorMessage.remove();
    }
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      errorMessage.remove();
    }
  });
};

uploadForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const isValid = pristine.validate();

  if (isValid) {
    uploadForm.querySelector(".img-upload__submit").disabled = true;
    const formData = new FormData(uploadForm);
    try {
      const response = await fetch(uploadForm.action, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        showSuccessMessage();
        closeForm();
      } else {
        showErrorMessage();
      }
    } catch (error) {
      showErrorMessage();
    } finally {
      uploadForm.querySelector(".img-upload__submit").disabled = false;
    }
  }
});

const previewImage = uploadForm.querySelector(".img-upload__preview img");
const scaleValue = uploadForm.querySelector(".scale__control--value");

const loadImage = () => {
  const file = uploadForm.querySelector(".img-upload__input").files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      previewImage.src = reader.result;
    };
    reader.readAsDataURL(file);
  }
};

uploadForm.querySelector(".img-upload__input").addEventListener("change", () => {
  loadImage();
  openForm();
});

const setScale = (scale) => {
  previewImage.style.transform = `scale(${scale / 100})`;
};

uploadForm.querySelector(".scale__control--smaller").addEventListener("click", () => {
  let currentValue = parseInt(scaleValue.value, 10);
  if (currentValue > 25) {
    currentValue -= 25;
    scaleValue.value = `${currentValue}%`;
    setScale(currentValue);
  }
});

uploadForm.querySelector(".scale__control--bigger").addEventListener("click", () => {
  let currentValue = parseInt(scaleValue.value, 10);
  if (currentValue < 100) {
    currentValue += 25;
    scaleValue.value = `${currentValue}%`;
    setScale(currentValue);
  }
});

uploadForm.querySelector(".effects__list").addEventListener("change", (event) => {
  previewImage.className = "";
  if (event.target.value !== "none") {
    previewImage.classList.add(`effects__preview--${event.target.value}`);
  }
});
