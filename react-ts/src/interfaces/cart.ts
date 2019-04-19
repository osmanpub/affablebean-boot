import { Product } from "./categories";

export interface Cart {
  items: CartItem[];
  numberOfItems: number;
  subtotal: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  total: number;
}
