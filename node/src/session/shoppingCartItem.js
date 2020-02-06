class ShoppingCartItem {
  constructor(product) {
    this.product = product;
    this.quantity = 1;
  }

  get product() {
    return this.product;
  }

  get quantity() {
    return this.quantity;
  }

  set quantity(quantity) {
    this.quantity = quantity;
  }

  get total() {
    return this.quantity * this.product.price;
  }

  incrementQuantity() {
    this.quantity++;
  }

  decrementQuantity() {
    this.quantity--;
  }
}
