class ShoppingCartItem {
  constructor(product) {
    this.product = product;
    this.quantity = 1;
    this.total = product.price;
  }

  setQuantity(quantity) {
    this.quantity = quantity;
    this.total = quantity * this.product.price;
  }
}

module.exports = {
  ShoppingCartItem
};
