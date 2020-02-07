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

  getTotal() {
    return this.total;
  }

  setQuantity(quantity) {
    this.quantity = quantity;
    this.total = quantity * this.product.price;
  }
}

module.exports = {
  ShoppingCartItem
};
