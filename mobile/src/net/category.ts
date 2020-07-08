import axios from 'axios';
import {getId, getNodePath, getRestPath, IS_NODE} from '../helpers/utils';
import {id} from '../interfaces/id';
import {RootState} from '../redux';
import {isFetching, receiveCategory} from '../redux/category';

export const fetchCategoryIfNeeded = (id: id) => (
  dispatch: Function,
  getState: Function,
) => {
  if (shouldFetchCategory(id, getState())) {
    return dispatch(fetchCategory(id));
  }
};

const fetchCategory = (id: id) => (dispatch: Function) => {
  dispatch(isFetching(true));

  if (IS_NODE) {
    return axios
      .get(getNodePath(`category/${id}`))
      .then((response) => {
        const {category, categories, products} = response.data.categoryProducts;
        dispatch(
          receiveCategory({
            category,
            categories,
            products,
          }),
        );
      })
      .catch((error) => console.log(error))
      .finally(() => dispatch(isFetching(false)));
  }

  fetch(getRestPath('category/' + id), {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, cors, *same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    // credentials: "same-origin", // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
    },
    // redirect: "follow", // manual, *follow, error
    // referrer: "no-referrer", // no-referrer, *client
  })
    .then((response) => response.json())
    .then((json) => dispatch(receiveCategory(json.content)))
    .finally(() => dispatch(isFetching(false)));
};

const shouldFetchCategory = (id: id, state: RootState) => {
  const {category} = state;

  if (
    category.categories.length === 0 ||
    Number(id) !== getId(category.category)
  ) {
    return true;
  }

  if (category.isFetching) {
    return false;
  }

  return category.didInvalidate;
};
