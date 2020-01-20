import { addToCart, updateCart } from "../../redux/cart";

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

export const updateProductInCart = (id: number, qty: number) => (
  dispatch: Function
) => {
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
