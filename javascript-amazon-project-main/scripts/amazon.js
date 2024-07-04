import { Cart } from '../data/cart-class.js';
import { products } from '../data/products.js';
import { formatCurrencty } from './utils/money.js';


const cart = new Cart('cart');
let productsHTML = '';

findQuantity();

products.forEach((product) => {
    productsHTML +=  `<div class="product-container">
        <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="${product.getStarsUrl()}">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            ${product.getPrice() }
          </div>

          <div class="product-quantity-container">
            <select class="js-selected-option-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
        </div>
        <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>`;
})

document.querySelector('.js-products-grid').innerHTML = productsHTML;

function findQuantity(){
  let cartQuantity = 0;
  cart.cartItems.forEach((product) => {
    cartQuantity += product.quantity;
  });

  document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;
}

document.querySelectorAll('.js-add-to-cart').forEach((button) => {
    button.addEventListener('click', () => {
        const productId = button.dataset.productId;
        let productQuantity = 1;
        const selectedOption = document.querySelector(`.js-selected-option-${productId}`)
        productQuantity = selectedOption.value;
        cart.addToCart(productId, productQuantity);
        findQuantity();
    });
});