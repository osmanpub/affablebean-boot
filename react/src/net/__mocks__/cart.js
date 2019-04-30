import { createAction } from "redux-starter-kit";

const addToCart = createAction("ADD_TO_CART");

export const addProductToCart = id => dispatch => {
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

const updateCart = createAction("UPDATE_CART");

export const updateProductInCart = (id, qty) => dispatch => {
  dispatch(
    updateCart({
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
            quantity: 2,
            total: 3.4
          }
        ],
        numberOfItems: 2,
        subtotal: 3.4
      },
      id: 1,
      qty: 2
    })
  );
};
