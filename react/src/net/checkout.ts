import axios from "axios";
import { getPath } from "../helpers/utils";
import { clearCart } from "../redux/cart";
import { orderPurchase } from "../redux/purchase";

export const purchaseOrder = (data: any) => (dispatch: Function) => {
  axios({
    method: "post",
    url: getPath("purchase2"),
    headers: {
      "Content-Type": "application/json"
    },
    data: JSON.stringify(data)
  })
    .then(response => {
      dispatch(clearCart({}));
      dispatch(
        orderPurchase({
          order: response.data
        })
      );
    })
    .catch(error => console.log(error));
};
