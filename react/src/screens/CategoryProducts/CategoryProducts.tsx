import React, { useEffect } from "react";
import { connect } from "react-redux";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Products from "../../components/Products";
import { Cart } from "../../interfaces/cart";
import { CategoryProducts as CategoryProductsState } from "../../interfaces/categories";
import { fetchCategoryIfNeeded } from "../../net/category";

type Props = {
  cart: Cart;
  category: CategoryProductsState;
  clearCart: Function;
  dispatch: Function;
  match: any;
};

export function CategoryProducts(props: Props) {
  const { cart, category, dispatch, match } = props;
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
      <Header cart={cart} url={match.url} />
      <Products
        cart={cart}
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
  const { cart, category } = state;

  return {
    cart,
    category
  };
};

export default connect(mapStateToProps)(CategoryProducts);
