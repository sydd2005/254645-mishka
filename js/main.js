var orderButton = document.querySelector(".promo__make-order");
var addToCartButtons = document.querySelectorAll(".product-card__add-to-cart");
var modal = document.querySelector(".modal");

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
