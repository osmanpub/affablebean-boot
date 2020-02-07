const ScItem = require("./shoppingCartItem");
const ShoppingCartItem = ScItem.ShoppingCartItem;

class ShoppingCart {
  constructor() {
    this.items = [];
  }

  getItems() {
    return this.items;
  }

  load(cart) {
    if (!cart || !cart.items || !Array.isArray(cart.items)) {
      return;
    }

    this.items = cart.items;
  }

  addItem(product) {
    const id = product._id.toString();
    const productIndex = this.items.findIndex(item => item.product._id === id);

    const scItem = new ShoppingCartItem(product);

    if (productIndex > -1) {
      const item = this.items[productIndex];
      scItem.setQuantity(item.quantity + 1);
      this.items[productIndex] = scItem;
    } else {
      this.items.push(scItem);
    }
  }

  update(product, quantity) {
    if (quantity < 0) {
      return;
    }

    const id = product._id.toString();
    const productIndex = this.items.findIndex(item => item.product._id === id);

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
    return this.items.reduce((total, item) => total + item.quantity, 0);
  }

  get subtotal() {
    return this.items.reduce(
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
