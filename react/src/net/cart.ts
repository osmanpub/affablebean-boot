import { getPath } from "../helpers/utils";
import { addToCart, updateCart } from "../redux/cart";

export const addProductToCart = (id: string) => async (dispatch: Function) => {
  const response = await fetch(getPath("addToCart2?id=" + id), {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    // credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json"
    }
    // redirect: "follow", // manual, *follow, error
    // referrer: "no-referrer", // no-referrer, *client
  });
  const json = await response.json();
  return dispatch(
    addToCart({
      cart: json
    })
  );
};

export const updateProductInCart = (id: number, qty: number) => async (
  dispatch: Function
) => {
  const response = await fetch(
    getPath("updateCart2?id=" + id + "&qty=" + qty),
    {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      // credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json"
      }
      // redirect: "follow", // manual, *follow, error
      // referrer: "no-referrer", // no-referrer, *client
    }
  );
  const json = await response.json();
  return dispatch(
    updateCart({
      cart: json,
      id,
      qty
    })
  );
};
