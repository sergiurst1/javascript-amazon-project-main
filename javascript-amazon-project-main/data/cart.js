export let cart = JSON.parse(localStorage.getItem('cart')) || [];

export function addToCart(productId){
    let matchItem;
    cart.forEach((item) => {
      if(productId === item.productId){
        matchItem = item;
      }
    });
    
    if(matchItem){
      matchItem.quantity++;
    }
    else{
      cart.push({
        productId: productId,
        quantity: 1,
        deleveryId: '1'
      });
    }

    localStorage.setItem('cart', JSON.stringify(cart))
}

export function deleteCartItem(productId){
    let newCart = [];

    cart.forEach((item) => {
      if(productId !== item.productId){
        newCart.push(item)
      }
    });

    cart = newCart;
    localStorage.setItem('cart', JSON.stringify(cart));
}