import axios from "axios";
import { getNodePath, getPath, IS_NODE } from "../helpers/utils";
import { addToCart, updateCart } from "../redux/cart";

export const addProductToCart = (id: string) => (dispatch: Function) => {
  if (IS_NODE) {
    axios({
      method: "post",
      url: getNodePath("addToCart/" + id),
      withCredentials: true
    })
      .then(response => {
        dispatch(
          addToCart({
            cart: response.data
          })
        );
      })
      .catch(error => console.log(error));

    return;
  }

  axios
    .post(getPath("addToCart2?id=" + id))
    .then(response =>
      dispatch(
        addToCart({
          cart: response.data
        })
      )
    )
    .catch(error => console.log(error));
};

export const updateProductInCart = (id: number, qty: number) => (
  dispatch: Function
) => {
  if (IS_NODE) {
    axios
      .post(getNodePath("updateCart/" + id + "/qty/") + qty)
      .then(response =>
        dispatch(
          addToCart({
            cart: response.data
          })
        )
      )
      .catch(error => console.log(error));

    return;
  }

  axios
    .post(getPath("updateCart2?id=" + id + "&qty=" + qty))
    .then(response =>
      dispatch(
        updateCart({
          cart: response.data,
          id,
          qty
        })
      )
    )
    .catch(function(error) {
      console.log(error);
    });
};
