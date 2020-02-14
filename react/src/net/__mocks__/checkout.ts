import { clearCart } from "../../redux/cart";
import { orderPurchase } from "../../redux/purchase";

export const purchaseOrder = (data: any) => (dispatch: Function) => {
  dispatch(clearCart({}));
  dispatch(
    orderPurchase({
      order: {
        orderRecord: {
          id: 1,
          amount: 6.4,
          confirmationNumber: 734284957,
          customer: {
            id: 1,
            address: "1600 King of Beers Avenue, Washington DC",
            ccNumber: "1234567890123456789",
            creditCard: "1234567890123456789",
            cityRegion: "NY",
            email: "joe@gmail.com",
            name: "Joe Sixpack Jr",
            phone: "1-800-JOE-SIXPACK"
          }
        },
        customer: {
          id: 1,
          address: "1600 King of Beers Avenue, Washington DC",
          ccNumber: "1234567890123456789",
          creditCard: "1234567890123456789",
          cityRegion: "NY",
          email: "joe@gmail.com",
          name: "Joe Sixpack Jr",
          phone: "1-800-JOE-SIXPACK"
        },
        orderedProducts: [
          {
            orderedProductPK: { customerOrderId: 1, productId: 1 },
            quantity: 2,
            customerOrder: null,
            product: null
          }
        ],
        products: [
          {
            id: 1,
            description: "semi skimmed (1L)",
            name: "milk",
            price: 1.7,
            category: { id: 1, name: "dairy" }
          }
        ]
      }
    })
  );
};
