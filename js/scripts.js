// navbar interactivity
const navLinks = document.querySelectorAll("a");

navLinks.forEach(link => {
  link.addEventListener("click", () => {
    link.classList.add("a-active");
  });
});


// lightbox section and product gallery section
const productMainImg = document.getElementById("product-main-img");
const productThumbnails = document.querySelectorAll(".product-thumbnail img");
const productThumbnail = document.querySelector(".product-thumbnail img");
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

let currentImgIndex = 0;

function closeLightbox() {
  lightbox.style.display = "none"
}
function openLightbox() {
  lightbox.style.display = "block"

}
productMainImg.addEventListener("click", openLightbox);
iconClose.addEventListener("click", closeLightbox);
iconPrevious.addEventListener('click', previousImg);
iconNext.addEventListener('click', nextImg);

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
  });
});

function previousImg() {
  if (currentImgIndex > 0) {
    currentImgIndex--
  } else {
    currentImgIndex = mainImgs.length - 1
  }
  lightboxMainImg.setAttribute("src", mainImgs[currentImgIndex]);

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
      thumbnail.classList.add("active");
    } else {
      thumbnail.classList.remove("active");
    }
  });
});

// cart functionalities
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
  element.style.display = "block"
}
function hideElements(element) {
  element.style.display = "none"
}
function minusItemNum() {
  let currentAmount = parseInt(cartAmountBefore.textContent);
  let newAmount = currentAmount - 1
  if (currentAmount > 0) {
    cartAmountBefore.textContent = newAmount
  }
}
function plusItemNum() {
  let currentAmount = parseInt(cartAmountBefore.textContent);
  let newAmount = currentAmount + 1
  cartAmountBefore.textContent = newAmount
}
function addToCart() {
  if (parseInt(cartAmountBefore.textContent) > 0) {
    cartAmount.textContent = cartAmountBefore.textContent
    showElements(cartAmount);
    hideElements(cartModalEmpty);
    itemThumbnail.setAttribute("src", productThumbnail.getAttribute("src"));
    itemName.innerHTML = productName.textContent
    let itemPriceNum = parseInt(currentPrice.textContent.replace(/[$,]/g, ""));
    let totalPriceNum = itemPriceNum * parseInt(cartAmount.textContent);
    itemPriceAmount.innerHTML = `${currentPrice.textContent} x ${cartAmount.textContent}`
    itemPriceTotal.innerHTML = `$${totalPriceNum.toFixed(2)}`
    cartModalFilled.style.display = "flex"
  }
}

function deleteItem() {
  hideElements(cartModalFilled);
  cartModalEmpty.style.display = "flex"
  hideElements(cartAmount);
}
function showCartModal(e) {
  e.stopPropagation();

  if (cartModal.classList.contains('hidden')) {
    cartModal.classList.remove('hidden');
  } else {
    cartModal.classList.add('hidden');
  }
}
document.addEventListener("click", (e) => {
  if (!cartModal.contains(e.target) && !cartIcon.contains(e.target)) {
    cartModal.classList.add('hidden');

  }
});
cartModal.addEventListener("click", (e) => {
  e.stopPropagation();
});

deleteIcon.addEventListener("click", deleteItem);
cartIcon.addEventListener("click", showCartModal);
addToCartBtn.addEventListener("click", addToCart);
iconMinus.addEventListener("click", minusItemNum);
iconPlus.addEventListener("click", plusItemNum);