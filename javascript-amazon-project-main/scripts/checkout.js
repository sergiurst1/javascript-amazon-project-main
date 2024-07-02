import {cart, updateDeliveryOption, deleteCartItem} from '../data/cart.js';
import { products } from '../data/products.js';
import { formatCurrencty } from './utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryOptions } from '../data/delevery_option.js';

let productsHTML = '';

cart.forEach((cartItem) =>{

    let addProduct; 
    products.forEach((product) => {
        if(cartItem.productId === product.id){
            addProduct = product;
        }
    });

    const deliveryOptionId = cartItem.deleveryId;

    let deliveryOption;

    deliveryOptions.forEach((option) => {
        if(option.id === deliveryOptionId){
            deliveryOption = option;
        }
    });

    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.days, 'days');
    const dateString = deliveryDate.format('dddd, MMMM, D');

    productsHTML += `
    <div class="cart-item-container js-cart-item-container-${addProduct.id}">
        <div class="delivery-date">
        Delivery date: ${dateString}
        </div>

        <div class="cart-item-details-grid">
        <img class="product-image"
            src="${addProduct.image}">

        <div class="cart-item-details">
            <div class="product-name">
            ${addProduct.name}
            </div>
            <div class="product-price">
            $${formatCurrencty(addProduct.priceCents)}
            </div>
            <div class="product-quantity">
            <span>
                Quantity: <span class="quantity-label">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary">
                Update
            </span>
            <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${addProduct.id}">
                Delete
            </span>
            </div>
        </div>

        <div class="delivery-options">
            <div class="delivery-options-title">
            Choose a delivery option:
            </div>
            ${deliveryOptionHTML(addProduct, cartItem)}
            </div>
        </div>
    </div>`
});

document.querySelector('.js-order-summary').innerHTML = productsHTML;

document.querySelectorAll('.js-delete-link').forEach( (link) => {
    link.addEventListener('click', () => {
        let productId = link.dataset.productId;
        deleteCartItem(productId);

        const container = document.querySelector(`.js-cart-item-container-${productId}`);
        container.remove();
    })
});

document.querySelectorAll('.js-delivery-option').forEach((element) => {
    element.addEventListener('click', () => {
        const {productId, deliveryOptionId}  = element.dataset;
        updateDeliveryOption(productId, deliveryOptionId);
    });
});

function deliveryOptionHTML(addProduct, cartItem){
    let html = ``;

    deliveryOptions.forEach((deliveryOption) =>{
        const today = dayjs();
        const deliveryDate = today.add(deliveryOption.days, 'days');
        const dateString = deliveryDate.format('dddd, MMMM, D');

        const priceString = deliveryOption.priceCents === 0 ? 'FREE' : `$${formatCurrencty(deliveryOption.priceCents)}`
        const isChecked = deliveryOption.id === cartItem.deleveryId;
        html +=`
            <div class="delivery-option js-delivery-option" data-product-id="${addProduct.id}" data-delivery-option-id="${deliveryOption.id}">
                <input type="radio" ${isChecked ? 'checked' : ''}
                class="delivery-option-input"
                name="delivery-option-${addProduct.id}">
                <div>
                    <div class="delivery-option-date">
                    ${dateString}
                    </div>
                    <div class="delivery-option-price">
                    ${priceString} - Shipping
                    </div>
                </div>
            </div>`
    })

    return html;
}
