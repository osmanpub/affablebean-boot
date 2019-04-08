import styled from "styled-components";

export const CategoryTitle = styled.p`
  margin-left: 700px;
  margin-top: -40px;
  /*right: 200px;*/
  font-size: x-large;
  /*position: absolute;*/
  background-color: #f5eabe;
  /*padding: 7px;*/
  /*border-radius: 4px;*/
`;

export const ProductsLeft = styled.div`
  width: 185px;
  float: left;
  margin-top: 25px;
  padding-left: 15px;
`;

export const ProductsRight = styled.div`
  margin-top: 10px;
  width: 650px;
  float: left;
`;

export const ProductsTable = styled.table`
  width: 600px;

  /* styles to collaborate with rounded categoryLabel */
  position: relative;
  z-index: 1;
`;

export const SelectedCategory = styled.span`
  margin: 15px 22px;
  padding: 13px;
  display: block;
  border-radius: 4px;

  background-color: #b2d2d2;
  margin-left: 10px;
  width: 139px;
`;

// #productTable tr { height: 90px }

// #productTable td { width: 145px }
