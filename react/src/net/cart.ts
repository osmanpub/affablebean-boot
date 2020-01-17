import axios from "axios";
import { getPath } from "../helpers/utils";
import { addToCart, updateCart } from "../redux/cart";

export const addProductToCart = (id: string) => (dispatch: Function) => {
  axios
    .post(getPath("addToCart2?id=" + id))
    .then(response =>
      dispatch(
        addToCart({
          cart: response.data
        })
      )
    )
    .catch(function(error) {
      console.log(error);
    });
};

export const updateProductInCart = (id: number, qty: number) => (
  dispatch: Function
) => {
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
