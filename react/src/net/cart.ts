import axios from "axios";
import { getNodePath, getPath, IS_NODE } from "../helpers/utils";
import { addToCart, updateCart } from "../redux/cart";

type id = number | string;

export const addProductToCart = (id: id) => (dispatch: Function) => {
  if (IS_NODE) {
    axios({
      method: "post",
      url: getNodePath(`addToCart/${id}`),
      withCredentials: true
    })
      .then(response => {
        const { cart, numberOfItems, subtotal } = response.data;
        dispatch(
          addToCart({
            cart,
            numberOfItems,
            subtotal
          })
        );
      })
      .catch(error => console.log(error));

    return;
  }

  axios
    .post(getPath(`addToCart2?id=${id}`))
    .then(response =>
      dispatch(
        addToCart({
          cart: response.data.cart
        })
      )
    )
    .catch(error => console.log(error));
};

export const updateProductInCart = (id: id, qty: number) => (
  dispatch: Function
) => {
  if (IS_NODE) {
    axios({
      method: "post",
      url: getNodePath(`updateCart/${id}/qty/${qty}`),
      withCredentials: true
    })
      .then(response => {
        const { cart, numberOfItems, subtotal } = response.data;
        dispatch(
          updateCart({
            cart,
            numberOfItems,
            subtotal,
            id,
            qty
          })
        );
      })
      .catch(error => console.log(error));

    return;
  }

  axios
    .post(getPath(`updateCart2?id=${id}&qty=${qty}`))
    .then(response =>
      dispatch(
        updateCart({
          cart: response.data,
          id,
          qty
        })
      )
    )
    .catch(error => console.log(error));
};
