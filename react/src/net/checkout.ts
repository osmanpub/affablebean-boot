import { getPath } from "../helpers/utils";
import { clearCart } from "../redux/cart";
import { orderPurchase } from "../redux/purchase";

export const purchaseOrder = (data: any) => async (dispatch: Function) => {
  const response = await fetch(getPath("purchase2"), {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    // credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data) // body data type must match "Content-Type" header
    // redirect: "follow", // manual, *follow, error
    // referrer: "no-referrer", // no-referrer, *client
  });

  try {
    const json = await response.json();
    dispatch(clearCart({}));
    dispatch(
      orderPurchase({
        order: json
      })
    );
  } catch (e) {
    console.log(e);
  }
};

// export const purchaseOrder = (data: any) => (dispatch: Function) => {
//   axios
//     .post(getPath("purchase2"))
//     .then(response => {
//       dispatch(clearCart({}));
//       dispatch(
//         orderPurchase({
//           order: response.data
//         })
//       );
//     })
//     .catch(function(error) {
//       console.log(error);
//     });
// };
