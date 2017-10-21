var orderButton = document.querySelector(".promo__make-order");
var addToCartButtons = document.querySelectorAll(".product-card__add-to-cart");
var modal = document.querySelector(".modal");
var nojsBody = document.querySelector(".no-js");
var menuToggle = document.querySelector(".top-menu__toggle");
var menuItems = document.querySelectorAll(".top-menu__item:not(.top-menu__item--logo):not(.top-menu__item--desktop-only):not(.top-menu__item--delivery)");

if (nojsBody) {
  nojsBody.classList.remove("no-js");
}

if (menuToggle) {
  menuToggle.addEventListener("click", function (event) {
    event.preventDefault();
    menuToggle.classList.toggle("top-menu__toggle--opened")
    if (menuItems) {
      menuItems.forEach(function(menuItem) {
        menuItem.classList.toggle("top-menu__item--show");
      });
    }
  });
}

function showModal(event) {
  event.preventDefault();
  modal.classList.add("modal--show");
}

if (orderButton) {
  orderButton.addEventListener("click", showModal);
}

if (addToCartButtons) {
  addToCartButtons.forEach(function(button) {
    button.addEventListener("click", showModal);
  });
}

window.addEventListener("keydown", function(event) {
  if (event.keyCode === 27) {
    if(modal.classList.contains("modal--show")) {
      modal.classList.remove("modal--show");
    }
  }
});
