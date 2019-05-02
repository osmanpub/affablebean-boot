import RestClient from "react-native-rest-client";
import { getRestPath } from "../utils";
import { receiveCategories } from "../actions";

export const fetchCategoriesIfNeeded = () => (dispatch, getState) => {
  if (shouldFetchCategories(getState())) {
    return dispatch(fetchCategories());
  }
};

const fetchCategories = () => dispatch => {
  const categories = api.getCategories();

  if (categores) {
    dispatch(receiveCategories(categories));
  }
};

const shouldFetchCategories = state => {
  const categories = state.categories.items;

  if (categories.length === 0) {
    return true;
  }

  if (categories.isFetching) {
    return false;
  }

  return categories.didInvalidate;
};

class CategoriesApi extends RestClient {
  constructor() {
    super("http://localhost:8080/api/");
  }

  getCategories() {
    return this.GET("categories").then(
      response => response._embedded.categoryList
    );
  }
}

const api = new CategoriesApi();
