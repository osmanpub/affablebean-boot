import React, { useEffect } from "react";
import { connect } from "react-redux";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Products from "../../components/Products";
import { CategoryProducts as CategoryProductsState } from "../../interfaces/categories";
import { Match } from "../../interfaces/router";
import { fetchCategoryIfNeeded } from "../../net/category";

type Props = {
  category: CategoryProductsState;
  clearCart: Function;
  dispatch: Function;
  match: Match;
};

function CategoryProducts(props: Props) {
  const { category, dispatch, match } = props;
  const { params } = match;
  const id = params.id;

  useEffect(() => {
    dispatch(fetchCategoryIfNeeded(id));
  }, [category, dispatch, id]);

  if (!category.category.hasOwnProperty("id")) {
    return null;
  }

  return (
    <div>
      <Header url={match.url} />
      <Products
        categories={category.categories}
        category={category.category}
        dispatch={dispatch}
        products={category.products}
      />
      <Footer />
    </div>
  );
}

const mapStateToProps = (state: Props) => {
  const { category } = state;

  return {
    category
  };
};

export default connect(mapStateToProps)(CategoryProducts);
