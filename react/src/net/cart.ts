import axios from "axios";
import { getNodePath, getPath, IS_NODE } from "../helpers/utils";
import { addToCart, clearCart, updateCart } from "../redux/cart";

type id = number | string;

export const addProductToCart = (id: id) => (dispatch: Function) => {
  axios({
    method: "post",
    url: IS_NODE
      ? getNodePath(`addToCart/${id}`)
      : getPath(`addToCart2?id=${id}`),
    withCredentials: true
  })
    .then(response => {
      const { items, numberOfItems, subtotal } = response.data;
      dispatch(
        addToCart({
          items,
          numberOfItems,
          subtotal
        })
      );
    })
    .catch(error => console.log(error));
};

export const emptyCart = () => (dispatch: Function) => {
  axios({
    method: "get",
    url: IS_NODE ? getNodePath("clearCart") : getPath("viewCart?clear=true"),
    withCredentials: true
  })
    .then(() => dispatch(clearCart({})))
    .catch(error => console.log(error));
};

export const updateProductInCart = (id: id, qty: number) => (
  dispatch: Function
) => {
  axios({
    method: "post",
    url: IS_NODE
      ? getNodePath(`updateCart/${id}/qty/${qty}`)
      : getPath(`updateCart2?id=${id}&qty=${qty}`),
    withCredentials: true
  })
    .then(response => {
      const { items, numberOfItems, subtotal } = response.data;
      dispatch(
        updateCart({
          items,
          numberOfItems,
          subtotal
        })
      );
    })
    .catch(error => console.log(error));
};
