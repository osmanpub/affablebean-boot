export interface Category {
  id: number;
  name: string;
}

export interface CategoryProducts {
  categories: Category[];
  category: Category;
  isFetching: boolean;
  didInvalidate: boolean;
  products: Product[];
}

export interface Categories {
  isFetching: boolean;
  didInvalidate: boolean;
  items: Category[];
}

export interface Product {
  description: string;
  id: number;
  name: string;
  price: number;
}
