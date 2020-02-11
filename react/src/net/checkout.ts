import axios from "axios";
import { getNodePath, getPath, IS_NODE } from "../helpers/utils";
import { clearCart } from "../redux/cart";
import { orderPurchase } from "../redux/purchase";
import { setFormErrors } from "../redux/ui";

export const purchaseOrder = (data: any) => (dispatch: Function) => {
  axios({
    method: "post",
    url: IS_NODE ? getNodePath("purchase") : getPath("purchase2"),
    headers: {
      "Content-Type": "application/json"
    },
    data: JSON.stringify(data),
    withCredentials: true
  })
    .then(response => {
      const { data } = response;

      if (!data) {
        return;
      }

      if (data === true) {
        // java
        dispatch(clearCart({}));
        dispatch(
          orderPurchase({
            order: response.data
          })
        );
      } else if (data.success === true) {
        // node
        dispatch(clearCart({}));
        dispatch(
          orderPurchase({
            order: response.data.order
          })
        );
      } else if (data.success === false) {
        dispatch(setFormErrors(data.errors));
      }
    })
    .catch(error => console.log(error));
};
