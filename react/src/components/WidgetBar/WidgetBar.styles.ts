import styled from "styled-components";
import { Cart } from "../../interfaces/cart";

export const WidgetBarWrapper = styled.div`
  height: 50px;
  width: 1080px;
  float: right;
`;

export const Checkout = styled.div`
  display: ${(cart: Cart) => (cart.numberOfItems > 0 ? "block" : "none")};
`;

export const ViewCart = styled.div`
  display: ${(cart: Cart) => (cart.numberOfItems > 0 ? "block" : "none")};
`;
