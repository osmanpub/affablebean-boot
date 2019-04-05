import { client, getPath } from "../utils";
import { requestCategories, receiveCategories } from "../actions";

export const fetchCategoriesIfNeeded = () => (dispatch, getState) => {
  if (shouldFetchCategories(getState())) {
    return dispatch(fetchCategories());
  }
};

const fetchCategories = () => dispatch => {
  dispatch(requestCategories());

  return client
    .get(getPath("categories"), function(data) {
      dispatch(receiveCategories(data._embedded.categoryList));
    })
    .on("error", function(err) {
      console.log("something went wrong on the request", err.request.options);
    });
};

const shouldFetchCategories = state => {
  const categories = state.categories.items;

  if (!categories || categories.length === 0) {
    return true;
  }

  if (categories.isFetching) {
    return false;
  }

  return categories.didInvalidate;
};
