import styled from "styled-components";

export const WidgetBarWrapper = styled.div`
  height: 50px;
  width: 1080px;
  float: right;
`;

export const Checkout = styled.div`
  display: ${cart => (cart.numberOfItems > 0 ? "block" : "none")};
`;

export const ViewCart = styled.div`
  display: ${cart => (cart.numberOfItems > 0 ? "block" : "none")};
`;

// #logo {
// 	float: left;
// 	margin-left: 30px;
// 	margin-top: -20px;
// }

// #cart {
// 	position: absolute;
// 	margin: 5px 0 0 2px;
// }

// #viewCart {
// 	text-align: left;
// 	width: 210px;
// }
