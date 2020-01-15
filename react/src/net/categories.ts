import { client, getRestPath } from "../utils";
import { receiveCategories } from "../redux/categories";
import { Categories } from "../interfaces/categories";

export const fetchCategoriesIfNeeded = () => (
  dispatch: Function,
  getState: Function
) => {
  if (shouldFetchCategories(getState())) {
    return dispatch(fetchCategories());
  }
};

const fetchCategories = () => (dispatch: Function) => {
  return client
    .get(getRestPath("categories"), function(data: any) {
      dispatch(receiveCategories(data._embedded.categoryList));
    })
    .on("error", function(err: any) {
      console.log("something went wrong on the request", err.request.options);
    });
};

const shouldFetchCategories = (state: any) => {
  const categories: Categories = state.categories;

  if (categories.items.length === 0) {
    return true;
  }

  if (categories.isFetching) {
    return false;
  }

  return categories.didInvalidate;
};
