import axios from 'axios';
import {getId, getNodePath, IS_NODE} from '../helpers/utils';
import {RootState} from '../redux';
import {receiveCategory} from '../redux/category';

type id = number | string;

export const fetchCategoryIfNeeded = (id: id) => (
  dispatch: Function,
  getState: Function,
) => {
  if (shouldFetchCategory(id, getState())) {
    return dispatch(fetchCategory(id));
  }
};

const fetchCategory = (id: id) => (dispatch: Function) => {
  if (IS_NODE) {
    return axios
      .get(getNodePath(`category/${id}`))
      .then(response => {
        const {category, categories, products} = response.data.categoryProducts;
        dispatch(
          receiveCategory({
            category,
            categories,
            products,
          }),
        );
      })
      .catch(error => console.log(error));
  }

  // return client
  //   .get(getRestPath(`category/${id}`), function(data: any) {
  //     dispatch(receiveCategory(data.content));
  //   })
  //   .on("error", function(err: any) {
  //     console.log("something went wrong on the request", err.request.options);
  //   });
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
