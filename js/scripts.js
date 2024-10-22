
// lightbox section and product gallery section
const productMainImg = document.getElementById("product-main-img");
const productThumbnails = document.querySelectorAll(".product-thumbnail");
const lightbox = document.querySelector(".lightbox");
const lightboxMainImg = document.getElementById("lightbox-main-img");
const iconPrevious = document.querySelector(".icon-previous");
const iconNext = document.querySelector(".icon-next");
const iconClose = document.querySelector(".icon-close");
const lightboxThumbnails = document.querySelectorAll(".lightbox-thumbnail");

const mainImgs = [
  "./images/image-product-1.jpg",
  "./images/image-product-2.jpg",
  "./images/image-product-3.jpg",
  "./images/image-product-4.jpg"
];
function closeLightbox() {
  lightbox.style.display = "none"
}
function openLightbox() {
  lightbox.style.display = "block"

}
productMainImg.addEventListener("click", openLightbox);
iconClose.addEventListener("click", closeLightbox);
if (openLightbox) {
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeLightbox();
    }
    if (e.key === "ArrowLeft") {
      previousImg();
    }
    if (e.key === "ArrowRight") {
      nextImg();
    }
  });
}

productThumbnails.forEach((thumbnail, index) => {
  thumbnail.addEventListener("click", () => {
    productMainImg.setAttribute("src", mainImgs[index]);
    thumbnail.classList.add("active")
  })
})



let currentImgIndex = 0;

iconPrevious.addEventListener('click', previousImg);
iconNext.addEventListener('click', nextImg);

function previousImg() {
  if (currentImgIndex > 0) {
    currentImgIndex--
  } else {
    currentImgIndex = mainImgs.length - 1
  }
  lightboxMainImg.setAttribute("src", mainImgs[currentImgIndex])

}
function nextImg() {
  if (currentImgIndex < mainImgs.length - 1) {
    currentImgIndex++;
  } else {
    currentImgIndex = 0;
  }
  lightboxMainImg.setAttribute("src", mainImgs[currentImgIndex]);

}

lightboxThumbnails.forEach((thumbnail, index) => {
  thumbnail.addEventListener("click", () => {
    currentImgIndex = index;
    lightboxMainImg.setAttribute("src", mainImgs[currentImgIndex]);
    if (index === currentImgIndex) {
      thumbnail.classList.add("active")
    } else {
      thumbnail.classList.remove("active")
    }
  });
})