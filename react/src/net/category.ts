import { client, getRestPath } from "../helpers/utils";
import { receiveCategory } from "../redux/category";
import { RootState } from "../redux";

export const fetchCategoryIfNeeded = (id: number) => (
  dispatch: Function,
  getState: Function
) => {
  if (shouldFetchCategory(id, getState())) {
    return dispatch(fetchCategory(id));
  }
};

const fetchCategory = (id: number) => (dispatch: Function) => {
  return client
    .get(getRestPath("category/" + id), function(data: any) {
      dispatch(receiveCategory(data.content));
    })
    .on("error", function(err: any) {
      console.log("something went wrong on the request", err.request.options);
    });
};

const shouldFetchCategory = (id: number, state: RootState) => {
  const { category } = state;

  if (category.categories.length === 0 || Number(id) !== category.category.id) {
    return true;
  }

  if (category.isFetching) {
    return false;
  }

  return category.didInvalidate;
};
