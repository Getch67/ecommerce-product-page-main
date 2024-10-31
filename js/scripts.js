const navElement = document.querySelector("nav");
const navUl = navElement.querySelector("ul");
const navLinks = document.querySelectorAll("nav a");
const navMenuOpen = document.querySelector(".nav-menu-icon");
const navMenuClose = document.querySelector(".close-nav-menu");

// Navbar interactivity
navLinks.forEach(link => {
  link.addEventListener("click", () => {
    navLinks.forEach(link => link.classList.remove("a-active"));
    link.classList.add("a-active");
  });
});

navMenuOpen.addEventListener("click", () => {
  navElement.style.display = "block";
  setTimeout(() => {
    navElement.style.opacity = "1";
    navUl.style.transform = "translateX(0)";
  }, 10);
});

navMenuClose.addEventListener("click", () => {
  navElement.style.opacity = "0";
  navUl.style.transform = "translateX(-100%)";
  setTimeout(() => {
    navElement.style.display = "none";
  }, 400);
});

// Lightbox and product gallery section
const productMainImg = document.getElementById("product-main-img");
const productThumbnails = document.querySelectorAll(".product-thumbnail img");
const productThumbnailsDiv = document.querySelectorAll(".product-thumbnail");
const lightbox = document.querySelector(".lightbox");
const lightboxMainImg = document.getElementById("lightbox-main-img");
const iconPrevious = document.querySelectorAll(".icon-previous");
const iconNext = document.querySelectorAll(".icon-next");
const iconClose = document.querySelector(".icon-close");
const lightboxThumbnails = document.querySelectorAll(".lightbox-thumbnail");
const lightboxThumbnailsImg = document.querySelectorAll(".lightbox-thumbnail img");

const mainImgs = [
  "./images/image-product-1.jpg",
  "./images/image-product-2.jpg",
  "./images/image-product-3.jpg",
  "./images/image-product-4.jpg"
];

let currentImgIndex = 0;

function closeLightbox() {
  lightbox.style.display = "none";
}

function openLightbox() {
  lightbox.style.display = "block";
}

window.matchMedia('(min-width: 769px)').matches
  ? productMainImg.addEventListener("click", openLightbox)
  : productMainImg.addEventListener("click", () => { });

iconClose.addEventListener("click", closeLightbox);

// Update the main image and highlight the current thumbnail
function updateImage(direction) {
  if (direction === "previous") {
    currentImgIndex = (currentImgIndex > 0) ? currentImgIndex - 1 : mainImgs.length - 1;
  } else {
    currentImgIndex = (currentImgIndex < mainImgs.length - 1) ? currentImgIndex + 1 : 0;
  }

  // const targetImg = window.matchMedia('(max-width: 640px)').matches ? productMainImg : lightboxMainImg;
  // targetImg.setAttribute("src", mainImgs[currentImgIndex]);
  productMainImg.setAttribute("src", mainImgs[currentImgIndex]);
  lightboxMainImg.setAttribute("src", mainImgs[currentImgIndex]);

  highlightActiveThumbnail();
}

// Highlight active thumbnail
function highlightActiveThumbnail() {
  productThumbnails.forEach((thumb, index) => {
    thumb.classList.toggle("active", index === currentImgIndex);
  });
  productThumbnailsDiv.forEach((thumbDiv, index) => {
    thumbDiv.classList.toggle("active-thum", index === currentImgIndex);
  });
  lightboxThumbnails.forEach((thumb, index) => {
    thumb.classList.toggle("active-thum", index === currentImgIndex);
  });
  lightboxThumbnailsImg.forEach((thumbImg, index) => {
    thumbImg.classList.toggle("active", index === currentImgIndex);
  });
}

// Add event listeners for the next and previous arrows
iconPrevious.forEach(icon => {
  icon.addEventListener("click", () => updateImage("previous"));
});
iconNext.forEach(icon => {
  icon.addEventListener("click", () => updateImage("next"));
});

// Debounce keydown event for smooth navigation
let debounceTimeout;
function handleKeydown(event) {
  clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(() => {
    if (event.key === "Escape") closeLightbox();
    if (event.key === "ArrowLeft") updateImage("previous");
    if (event.key === "ArrowRight") updateImage("next");
  }, 100);
}

window.addEventListener("keydown", handleKeydown);

// Thumbnails interaction
function handleThumbnailClick(index) {
  currentImgIndex = index;
  productMainImg.setAttribute("src", mainImgs[currentImgIndex]);
  highlightActiveThumbnail();
}

productThumbnails.forEach((thumbnail, index) => {
  thumbnail.addEventListener("click", () => handleThumbnailClick(index));
});

productThumbnailsDiv.forEach((thumbDiv, index) => {
  thumbDiv.addEventListener("click", () => {
    currentImgIndex = index;
    productMainImg.setAttribute("src", mainImgs[currentImgIndex]);
    highlightActiveThumbnail();
  });
});

// Lightbox thumbnail interaction
lightboxThumbnails.forEach((thumbnail, index) => {
  thumbnail.addEventListener("click", () => {
    currentImgIndex = index;
    lightboxMainImg.setAttribute("src", mainImgs[currentImgIndex]);
    highlightActiveThumbnail();
  });
});
lightboxThumbnailsImg.forEach((thumbnail, index) => {
  thumbnail.addEventListener("click", () => {
    currentImgIndex = index;
    lightboxMainImg.setAttribute("src", mainImgs[currentImgIndex]);
    highlightActiveThumbnail();
  });
});

// Cart functionalities
const iconMinus = document.getElementById("minus-icon");
const iconPlus = document.getElementById("plus-icon");
const addToCartBtn = document.querySelector(".add-to-cart-btn");
const cartAmount = document.querySelector(".cart-icon-amount");
const cartAmountBefore = document.querySelector(".cart-amount-num");
const cartModal = document.querySelector(".cart-modal");
const cartModalEmpty = document.querySelector(".cart-modal-empty");
const cartModalFilled = document.querySelector(".cart-modal-filled");
const cartIcon = document.getElementById("cart-icon");
const deleteIcon = document.querySelector(".delete-icon");
const itemThumbnail = document.querySelector(".item-thumbnail");
const itemName = document.querySelector(".item-name");
const itemPriceAmount = document.querySelector(".item-price-amount");
const itemPriceTotal = document.querySelector(".item-price-total");
const productName = document.querySelector(".product-descriptions h1");
const currentPrice = document.querySelector(".current-price");

function showElements(element) {
  element.style.display = "block";
}

function hideElements(element) {
  element.style.display = "none";
}

function minusItemNum() {
  let currentAmount = parseInt(cartAmountBefore.textContent);
  if (currentAmount > 0) {
    cartAmountBefore.textContent = currentAmount - 1;
  }
}

function plusItemNum() {
  let currentAmount = parseInt(cartAmountBefore.textContent);
  cartAmountBefore.textContent = currentAmount + 1;
}

function addToCart() {
  if (parseInt(cartAmountBefore.textContent) > 0) {
    cartAmount.textContent = cartAmountBefore.textContent;
    showElements(cartAmount);
    hideElements(cartModalEmpty);
    itemThumbnail.setAttribute("src", productMainImg.getAttribute("src"));
    itemName.textContent = productName.textContent;
    let itemPriceNum = parseInt(currentPrice.textContent.replace(/[$,]/g, ""));
    let totalPriceNum = itemPriceNum * parseInt(cartAmount.textContent);
    itemPriceAmount.textContent = `${currentPrice.textContent} x ${cartAmount.textContent}`;
    itemPriceTotal.textContent = `$${totalPriceNum.toFixed(2)}`;
    cartModalFilled.style.display = "flex";
  }
}

function deleteItem() {
  hideElements(cartModalFilled);
  cartModalEmpty.style.display = "flex";
  hideElements(cartAmount);
}

function showCartModal(e) {
  e.stopPropagation();
  cartModal.classList.toggle('hidden');
}

document.addEventListener("click", (e) => {
  if (!cartModal.contains(e.target) && !cartIcon.contains(e.target)) {
    cartModal.classList.add('hidden');
  }
});

cartModal.addEventListener("click", (e) => e.stopPropagation());

deleteIcon.addEventListener("click", deleteItem);
cartIcon.addEventListener("click", showCartModal);
addToCartBtn.addEventListener("click", addToCart);
iconMinus.addEventListener("click", minusItemNum);
iconPlus.addEventListener("click", plusItemNum);


