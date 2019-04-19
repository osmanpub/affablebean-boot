import { Cart, CartItem } from "./cart";
import { Category, Categories, CategoryProducts } from "./categories";
import { Purchase } from "./purchase";
import { Subjects } from "./subjects";

export interface Props {
  cart: Cart;
  categories: Categories;
  category: CategoryProducts;
  dispatch: Function;
  match: any;
  purchase: Purchase;
  subjects: Subjects;
}

export interface CartItemProps {
  dispatch: Function;
  index: number;
  item: CartItem;
}

export interface CategoriesProps {
  categories: Category[];
}

export interface CategoryProductsProps {
  categories: Category[];
  category: Category;
  dispatch: Function;
  products: any;
}

export interface HeaderProps {
  cart: Cart;
  url: string;
}
