export interface Category {
  id: number;
  name: string;
}

export type CategoryState = Category & { _links: any };

export interface Categories {
  isFetching: boolean;
  didInvalidate: boolean;
  items: Array<CategoryState>;
}

export interface Product {
  description: string;
  id: number;
  name: string;
  price: number;
}

export type ProductState = Product & Category & { _links: any };

export interface CategoryProducts {
  categories: Array<CategoryState>;
  category: CategoryState;
  didInvalidate: boolean;
  isFetching: boolean;
  products: Array<ProductState>;
}
