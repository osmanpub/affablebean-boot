const { RESTDataSource } = require("apollo-datasource-rest");

class CartAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "http://localhost:3001/";
  }

  async addToCart(id) {
    console.log(`addtocart ${id}`);
    const response = await this.post(`addToCart/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    console.log(response);
    return response;
  }
}

module.exports = CartAPI;

// export const emptyCart = () => (dispatch: Function) => {
//   dispatch(isFetching(true));

//   axios({
//     method: "get",
//     url: IS_NODE ? getNodePath("clearCart") : getPath("viewCart?clear=true"),
//     withCredentials: true,
//   })
//     .then(() => dispatch(clearCart({})))
//     .catch((error) => console.log(error))
//     .finally(() => dispatch(isFetching(false)));
// };

// export const updateProductInCart = (id: ID, qty: number) => (
//   dispatch: Function
// ) => {
//   dispatch(isFetching(true));

//   axios({
//     method: "post",
//     url: IS_NODE
//       ? getNodePath(`updateCart/${id}/qty/${qty}`)
//       : getPath(`updateCart2?id=${id}&qty=${qty}`),
//     withCredentials: true,
//   })
//     .then((response) => {
//       const { items, numberOfItems, subtotal } = response.data;
//       dispatch(
//         updateCart({
//           items,
//           numberOfItems,
//           subtotal,
//         })
//       );
//     })
//     .catch((error) => console.log(error))
//     .finally(() => dispatch(isFetching(false)));
// };
