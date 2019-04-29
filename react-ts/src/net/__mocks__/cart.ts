import { createAction } from "redux-starter-kit";

const addToCart = createAction("ADD_TO_CART");

export const addProductToCart = (id: number) => (dispatch: Function) => {
  dispatch(
    addToCart({
      cart: {
        items: [
          {
            product: {
              id: 1,
              description: "semi skimmed (1L)",
              name: "milk",
              price: 1.7,
              category: { id: 1, name: "dairy" }
            },
            quantity: 1,
            total: 1.7
          }
        ],
        numberOfItems: 1,
        subtotal: 1.7
      }
    })
  );
};

// export const updateProductInCart = (id, qty) => dispatch => {
//   return fetch(getPath("updateCart2?id=" + id + "&qty=" + qty), {
//     method: "POST", // *GET, POST, PUT, DELETE, etc.
//     mode: "cors", // no-cors, cors, *same-origin
//     cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
//     // credentials: "same-origin", // include, *same-origin, omit
//     headers: {
//       "Content-Type": "application/json"
//     }
//     // redirect: "follow", // manual, *follow, error
//     // referrer: "no-referrer", // no-referrer, *client
//   })
//     .then(response => response.json())
//     .then(json =>
//       dispatch(
//         updateCart({
//           cart: json,
//           id: id,
//           qty: qty
//         })
//       )
//     );
// };
