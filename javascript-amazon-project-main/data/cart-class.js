
export class Cart{

  cartItems;
  #localStorageKey;

  constructor(aKey){
    this.#localStorageKey = aKey;
    this.loadFromStorage();
  }

  loadFromStorage(){
    this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey)) || [];
  }

  addToCart(productId, productQuantity){
      let matchItem;
      this.cartItems.forEach((item) => {
        if(productId === item.productId){
          matchItem = item;
        }
      });
      
      if(matchItem){
        matchItem.quantity += Number(productQuantity);
      }
      else{
        this.cartItems.push({
          productId: productId,
          quantity: Number(productQuantity),
          deliveryOptionId: '1'
        });
      }

      this.saveToLocalStorage();
  }

  deleteCartItem(productId){
      let newCart = [];

      this.cartItems.forEach((item) => {
        if(productId !== item.productId){
          newCart.push(item)
        }
      });

      this.cartItems = newCart;
      this.saveToLocalStorage();
  }

  updateDeliveryOption(productId, deliveryOptionId){
      let matchItem;
      this.cartItems.forEach((item) => {
        if(productId === item.productId){
          matchItem = item;
        }
      });
      matchItem.deliveryOptionId = deliveryOptionId;

      this.saveToLocalStorage();
  }

  saveToLocalStorage(){
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
  }
}