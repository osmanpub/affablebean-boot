import styled from "styled-components";

export const EmptyCart = styled.div`
  display: ${cart => (cart.numberOfItems === 0 ? "block" : "none")};
`;
