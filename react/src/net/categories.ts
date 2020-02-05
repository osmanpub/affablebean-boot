import { client, getRestPath, IS_NODE } from "../helpers/utils";
import { RootState } from "../redux";
import { receiveCategories } from "../redux/categories";

export const fetchCategoriesIfNeeded = () => (
  dispatch: Function,
  getState: Function
) => {
  if (shouldFetchCategories(getState())) {
    return dispatch(fetchCategories());
  }
};

const fetchCategories = () => (dispatch: Function) => {
  if (IS_NODE) {
  }

  // Java
  return client
    .get(getRestPath("categories"), function(data: any) {
      dispatch(receiveCategories(data._embedded.categoryList));
    })
    .on("error", function(err: any) {
      console.log("something went wrong on the request", err.request.options);
    });
};

const shouldFetchCategories = (state: RootState) => {
  const { categories } = state;
  const { items } = categories;

  if (items.length === 0) {
    return true;
  }

  if (categories.isFetching) {
    return false;
  }

  return categories.didInvalidate;
};
