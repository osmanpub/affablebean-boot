import axios from 'axios';
import {getNodePath, getPath, IS_NODE} from '../helpers/utils';
import {id} from '../interfaces/id';
import {addToCart, clearCart, isFetching, updateCart} from '../redux/cart';

export const addProductToCart = (id: id) => (dispatch: Function) => {
  dispatch(isFetching(true));

  axios({
    method: 'post',
    url: IS_NODE
      ? getNodePath(`addToCart/${id}`)
      : getPath(`addToCart2?id=${id}`),
    withCredentials: true,
  })
    .then((response) => {
      const {items, numberOfItems, subtotal} = response.data;
      dispatch(
        addToCart({
          items,
          numberOfItems,
          subtotal,
        }),
      );
    })
    .catch((error) => console.log(error))
    .finally(() => dispatch(isFetching(false)));
};

export const emptyCart = (cb: Function) => (dispatch: Function) => {
  dispatch(isFetching(true));

  axios({
    method: 'get',
    url: IS_NODE ? getNodePath('clearCart') : getPath('viewCart?clear=true'),
    withCredentials: true,
  })
    .then(() => {
      cb();
      dispatch(clearCart({}));
    })
    .catch((error) => console.log(error))
    .finally(() => dispatch(isFetching(false)));
};

export const updateProductInCart = (id: id, qty: number) => (
  dispatch: Function,
) => {
  dispatch(isFetching(true));

  axios({
    method: 'post',
    url: IS_NODE
      ? getNodePath(`updateCart/${id}/qty/${qty}`)
      : getPath(`updateCart2?id=${id}&qty=${qty}`),
    withCredentials: true,
  })
    .then((response) => {
      const {items, numberOfItems, subtotal} = response.data;
      dispatch(
        updateCart({
          items,
          numberOfItems,
          subtotal,
        }),
      );
    })
    .catch((error) => console.log(error))
    .finally(() => dispatch(isFetching(false)));
};
