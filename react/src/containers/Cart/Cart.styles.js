import styled from "styled-components";

export const ActionBar = styled.div`
  margin: 30px;
  width: 750px;
  text-align: center;
`;

export const CartTable = styled.table`
  width: 750px;
`;

export const CartHdr = styled.tr`
  background-color: #c3e3e0;
  height: 30px;
`;

export const CartTableTd = styled.td`
  width: 145px;
  height: 90px;
`;

export const ShoppingCart = styled.div`
  display: ${cart => (cart.numberOfItems > 0 ? "block" : "none")};
`;

export const Subtotal = styled.h4`
  margin: 40px 0 20px 430px;
`;
