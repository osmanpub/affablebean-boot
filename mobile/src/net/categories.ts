import axios from 'axios';
import {getNodePath, getRestPath, IS_NODE} from '../helpers/utils';
import {RootState} from '../redux';
import {isFetching, receiveCategories} from '../redux/categories';

export const fetchCategoriesIfNeeded = () => (
  dispatch: Function,
  getState: Function,
) => {
  if (shouldFetchCategories(getState())) {
    return dispatch(fetchCategories());
  }
};

const fetchCategories = () => (dispatch: Function) => {
  dispatch(isFetching(true));

  if (IS_NODE) {
    return axios
      .get(getNodePath('categories'))
      .then((response) => {
        dispatch(receiveCategories(response.data.categories));
      })
      .catch((error) => console.log(error))
      .finally(() => dispatch(isFetching(false)));
  }

  fetch(getRestPath('categories'), {
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
    .then((json) => dispatch(receiveCategories(json._embedded.categoryList)))
    .finally(() => dispatch(isFetching(false)));
};

const shouldFetchCategories = (state: RootState) => {
  const {categories} = state;
  const {items} = categories;

  if (items.length === 0) {
    return true;
  }

  if (categories.isFetching) {
    return false;
  }

  return categories.didInvalidate;
};
