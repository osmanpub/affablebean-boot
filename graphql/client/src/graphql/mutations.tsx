import gql from "graphql-tag";

export const ADD_TO_CART = gql`
  mutation addToCart($id: ID!) {
    addToCart(id: $id) {
      items {
        product {
          id
          name
          description
          price
        }
        quantity
        total
      }
      numberOfItems
      subtotal
    }
  }
`;

export const SEND_FEEDBACK = gql`
  mutation contact(
    $name: String!
    $email: String!
    $msg: String!
    $subjectId: String!
  ) {
    contact(name: $name, email: $email, msg: $msg, subjectId: $subjectId) {
      success
    }
  }
`;
