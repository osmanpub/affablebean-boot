import { client, getRestPath } from "../utils";
import { receiveCategory } from "../redux/category";

export const fetchCategoryIfNeeded = id => (dispatch, getState) => {
  if (shouldFetchCategory(id, getState())) {
    return dispatch(fetchCategory(id));
  }
};

const fetchCategory = id => dispatch => {
  return client
    .get(getRestPath("category/" + id), function(data) {
      dispatch(receiveCategory(data.content));
    })
    .on("error", function(err) {
      console.log("something went wrong on the request", err.request.options);
    });
};

const shouldFetchCategory = (id, state) => {
  const { category } = state;

  if (category.categories.length === 0 || Number(id) !== category.category.id) {
    return true;
  }

  if (category.isFetching) {
    return false;
  }

  return category.didInvalidate;
};
