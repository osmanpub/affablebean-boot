import axios from "axios";
import {
  client,
  getId,
  getNodePath,
  getRestPath,
  IS_NODE,
} from "../helpers/utils";
import { ID } from "../interfaces/id";
import { RootState } from "../redux";
import { isFetching, receiveCategory } from "../redux/category";

export const fetchCategoryIfNeeded = (id: ID) => (
  dispatch: Function,
  getState: Function
) => {
  if (shouldFetchCategory(id, getState())) {
    return dispatch(fetchCategory(id));
  }
};

const fetchCategory = (id: ID) => (dispatch: Function) => {
  if (IS_NODE) {
    dispatch(isFetching(true));

    return axios
      .get(getNodePath(`category/${id}`))
      .then((response) => {
        const {
          category,
          categories,
          products,
        } = response.data.categoryProducts;
        dispatch(
          receiveCategory({
            category,
            categories,
            products,
          })
        );
      })
      .catch((error) => console.log(error))
      .finally(() => dispatch(isFetching(false)));
  }

  return client
    .get(getRestPath(`category/${id}`), function (data: any) {
      dispatch(receiveCategory(data.content));
    })
    .on("error", function (err: any) {
      console.log("something went wrong on the request", err.request.options);
    });
};

const shouldFetchCategory = (id: ID, state: RootState) => {
  const { category } = state;

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
