import { Product } from "./categories";

export interface Cart {
  items: Array<CartItem>;
  numberOfItems: number;
  subtotal: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  total: number;
}
