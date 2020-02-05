import axios from "axios";
import { client, getNodePath, getRestPath, IS_NODE } from "../helpers/utils";
import { RootState } from "../redux";
import { receiveCategory } from "../redux/category";

export const fetchCategoryIfNeeded = (id: any) => (
  dispatch: Function,
  getState: Function
) => {
  if (shouldFetchCategory(id, getState())) {
    return dispatch(fetchCategory(id));
  }
};

const fetchCategory = (id: any) => (dispatch: Function) => {
  if (IS_NODE) {
    return axios
      .get(getNodePath("category/" + id))
      .then(response => {
        const { category, products } = response.data.categoryProducts;
        const data = {
          category: { ...category, id: category._id },
          products: products.map((p: any) => ({ ...p, id: p._id }))
        };
        console.log(data);
        dispatch(receiveCategory(data));
      })
      .catch(error => console.log(error));
  }

  return client
    .get(getRestPath("category/" + id), function(data: any) {
      dispatch(receiveCategory(data.content));
    })
    .on("error", function(err: any) {
      console.log("something went wrong on the request", err.request.options);
    });
};

const shouldFetchCategory = (id: any, state: RootState) => {
  const { category } = state;

  if (category.categories.length === 0 || Number(id) !== category.category.id) {
    return true;
  }

  if (category.isFetching) {
    return false;
  }

  return category.didInvalidate;
};
