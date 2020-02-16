import {combineReducers} from 'redux';
import {Cart} from '../interfaces/cart';
import {Categories, CategoryProducts} from '../interfaces/categories';
import {Purchase} from '../interfaces/purchase';
import {Subjects} from '../interfaces/subjects';
import UI from '../interfaces/ui';
import cartReducer from './cart';
import categoriesReducer from './categories';
import categoryReducer from './category';
import purchaseReducer from './purchase';
import subjectsReducer from './subjects';
import uiReducer from './ui';

export default combineReducers({
  cart: cartReducer,
  category: categoryReducer,
  categories: categoriesReducer,
  purchase: purchaseReducer,
  subjects: subjectsReducer,
  ui: uiReducer,
});

export interface RootState {
  cart: Cart;
  category: CategoryProducts;
  categories: Categories;
  purchase: Purchase;
  subjects: Subjects;
  ui: UI;
}
