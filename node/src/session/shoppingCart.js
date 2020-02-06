const ScItem = require("./shoppingCartItem");
const ShoppingCartItem = ScItem.ShoppingCartItem;

class ShoppingCart {
  constructor() {
    this.items = [];
  }

  getItems() {
    return this.items;
  }

  addItem(product) {
    const productIndex = this.items.findIndex(
      item => item.product.id === product.id
    );

    if (productIndex > -1) {
      const item = this.items[productIndex];
      item.incrementQuantity();
    } else {
      this.items.push(new ShoppingCartItem(product));
    }
  }

  update(product, quantity) {
    if (quantity < 0) {
      return;
    }

    const productIndex = this.items.findIndex(
      item => item.product.id === product.id
    );

    if (productIndex > -1) {
      const item = this.items[productIndex];

      if (quantity > 0) {
        item.quantity = quantity;
      } else {
        this.items.splice(productIndex, 1);
      }
    }
  }

  get numberOfItems() {
    return items.reduce((total, item) => total + item.quantity, 0);
  }

  get subtotal() {
    return items.reduce(
      (total, item) => total + item.quantity * item.product.price,
      0
    );
  }

  clear() {
    this.items = [];
  }
}

module.exports = {
  ShoppingCart
};
