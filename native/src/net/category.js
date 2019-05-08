import { getRestPath } from "../utils";
import { receiveCategory } from "../actions";

export const fetchCategoryIfNeeded = id => (dispatch, getState) => {
  if (shouldFetchCategory(id, getState())) {
    return dispatch(fetchCategory(id));
  }
};

const fetchCategory = id => dispatch => {
  fetch(getRestPath("category/" + id), {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, cors, *same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    // credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json"
    }
    // redirect: "follow", // manual, *follow, error
    // referrer: "no-referrer", // no-referrer, *client
  })
    .then(response => response.json())
    .then(json => dispatch(receiveCategory(json.content)));
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
