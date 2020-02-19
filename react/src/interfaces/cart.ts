import { Product } from "./categories";

export interface Cart {
  didInvalidate: boolean;
  isFetching: boolean;
  items: Array<CartItem>;
  numberOfItems: number;
  subtotal: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  total: number;
}
