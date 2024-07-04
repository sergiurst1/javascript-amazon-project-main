import { Cart } from '../../data/cart-class.js';
import { getProduct } from "../../data/products.js"; 
import { getDeliveryOption } from "../../data/delevery_option.js";  
import { formatCurrencty } from "../utils/money.js";

export function renderPaymentSummary(){
    const cart = new Cart('cart');

    let productPriceCents = 0;
    let cartItms = 0;
    let shippingPriceCents = 0;

    cart.cartItems.forEach((cartItem) => {
        const product = getProduct(cartItem.productId);
        productPriceCents += product.priceCents * cartItem.quantity;
        cartItms += cartItem.quantity;

        const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
        shippingPriceCents += deliveryOption.priceCents;
    });

    const totalBeforeTaxPriceCents = productPriceCents + shippingPriceCents;
    
    const totalPriceCents = totalBeforeTaxPriceCents + (totalBeforeTaxPriceCents * 0.1);

    const paymentSummaryHTML = `
        <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${cartItms}):</div>
            <div class="payment-summary-money">$${formatCurrencty(productPriceCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrencty(shippingPriceCents)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrencty(totalBeforeTaxPriceCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrencty(totalBeforeTaxPriceCents * 0.1)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrencty(totalPriceCents)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
    `;

    document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;

}