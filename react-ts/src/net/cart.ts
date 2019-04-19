import { getPath } from "../utils";
import { addToCart, updateCart } from "../actions";

export const addProductToCart = (id: string) => (dispatch: Function) => {
  return fetch(getPath("addToCart2?id=" + id), {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
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
    .then(json =>
      dispatch(
        addToCart({
          cart: json
        })
      )
    );
};

export const updateProductInCart = (id: number, qty: number) => (
  dispatch: Function
) => {
  return fetch(getPath("updateCart2?id=" + id + "&qty=" + qty), {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
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
    .then(json =>
      dispatch(
        updateCart({
          cart: json,
          id: id,
          qty: qty
        })
      )
    );
};
