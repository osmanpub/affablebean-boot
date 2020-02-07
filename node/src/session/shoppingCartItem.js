class ShoppingCartItem {
  constructor(product) {
    this.product = product;
    this.quantity = 1;
  }

  getProduct() {
    return this.product;
  }

  getQuantity() {
    return this.quantity;
  }

  setQuantity(quantity) {
    this.quantity = quantity;
  }

  getTotal() {
    return this.quantity * this.product.price;
  }
}

module.exports = {
  ShoppingCartItem
};