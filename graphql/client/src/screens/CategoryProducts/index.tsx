import React from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Products from "../../components/Products";
import { Match } from "../../interfaces/router";

type Props = {
  match: Match;
};

function CategoryProducts(props: Props) {
  const { match } = props;
  const { params } = match;
  const id = params.id;

  return (
    <div>
      <Header url={match.url} />
      <Products id={id} />
      <Footer />
    </div>
  );
}

export default CategoryProducts;
