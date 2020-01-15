import React, { useEffect } from "react";
import { connect } from "react-redux";
import Categories from "../../components/Categories";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { Props } from "../../interfaces/props";
import { fetchCategoriesIfNeeded } from "../../net/categories";
import { RootState } from "../../redux";

export function Home(props: Props) {
  useEffect(() => {
    const { dispatch } = props;
    dispatch(fetchCategoriesIfNeeded());
  }, []);

  const { cart, categories, match } = props;
  const { items } = categories;
  const url = match ? match.url : "";

  if (items.length === 0) {
    return null;
  }

  return (
    <div>
      <Header cart={cart} url={url} />
      <Categories categories={items} />
      <Footer />
    </div>
  );
}

const mapStateToProps = (state: RootState) => ({
  cart: state.cart,
  categories: state.categories
});

export default connect(mapStateToProps)(Home);
