import { client, getPath } from "../utils.js";
import { requestCategories, receiveCategories } from "../actions";

export const fetchCategories = () => dispatch => {
  dispatch(requestCategories());

  return client
    .get(getPath("categories"), function(data) {
      dispatch(receiveCategories(data._embedded.categoryList));
    })
    .on("error", function(err) {
      console.log("something went wrong on the request", err.request.options);
    });
};
