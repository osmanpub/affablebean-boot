import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Products from "../../components/Products";
import { CategoryProducts as CategoryProductsState } from "../../interfaces/categories";
import { Match } from "../../interfaces/router";
import { fetchCategoryIfNeeded } from "../../net/category";
import { RootState } from "../../redux";

type Props = {
  category: CategoryProductsState;
  clearCart: Function;
  match: Match;
};

function CategoryProducts(props: Props) {
  const { category, match } = props;
  const { params } = match;
  const id = params.id;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategoryIfNeeded(id));
  }, [dispatch, id]);

  if (
    !category.category.hasOwnProperty("id") &&
    !category.category.hasOwnProperty("_id")
  ) {
    return null;
  }

  return (
    <div>
      <Header url={match.url} />
      <Products
        categories={category.categories}
        category={category.category}
        products={category.products}
      />
      <Footer />O
    </div>
  );
}

const mapStateToProps = (state: RootState) => {
  const { category } = state;

  return {
    category,
  };
};

export default connect(mapStateToProps)(CategoryProducts);
