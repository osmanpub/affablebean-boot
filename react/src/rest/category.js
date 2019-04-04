import { client, getPath } from "../utils";
import { requestCategory, receiveCategory } from "../actions";

export const fetchCategory = id => dispatch => {
  dispatch(requestCategory());

  return client
    .get(getPath("category"), function(data) {
      dispatch(receiveCategory(data._embedded.categoryList));
    })
    .on("error", function(err) {
      console.log("something went wrong on the request", err.request.options);
    });
};
