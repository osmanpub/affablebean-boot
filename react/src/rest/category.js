import { client, getPath } from "../utils";
import { receiveCategory } from "../actions";

export const fetchCategoryIfNeeded = id => (dispatch, getState) => {
  if (shouldFetchCategory(id, getState())) {
    return dispatch(fetchCategory(id));
  }
};

const fetchCategory = id => dispatch => {
  return client
    .get(getPath("category/" + id), function(data) {
      dispatch(receiveCategory(data.content));
    })
    .on("error", function(err) {
      console.log("something went wrong on the request", err.request.options);
    });
};

const shouldFetchCategory = (id, state) => {
  const category = state.category;

  if (category.categories.length === 0 || Number(id) !== category.category.id) {
    return true;
  }

  if (category.isFetching) {
    return false;
  }

  return category.didInvalidate;
};
