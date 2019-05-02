import { getPath } from "../utils";
import { clearCart, orderPurchase } from "../actions";

export const purchaseOrder = data => dispatch => {
  return fetch(getPath("purchase2"), {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, cors, *same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    // credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data) // body data type must match "Content-Type" header
    // redirect: "follow", // manual, *follow, error
    // referrer: "no-referrer", // no-referrer, *client
  })
    .then(response => response.json())
    .then(json => {
      dispatch(clearCart());
      dispatch(
        orderPurchase({
          order: json
        })
      );
    });
};
