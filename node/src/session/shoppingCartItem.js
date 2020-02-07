class ShoppingCartItem {
  constructor(product) {
    this.product = product;
    this.quantity = 1;
    this.total = product.price;
  }

  getProduct() {
    return this.product;
  }

  getQuantity() {
    return this.quantity;
  }

  setQuantity(quantity) {
    this.quantity = quantity;
    this.total = quantity * product.price;
  }
}

module.exports = {
  ShoppingCartItem
};
