import React, { useEffect } from "react";
import { connect } from "react-redux";
import Categories from "../../components/Categories";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { Categories as CategoriesState } from "../../interfaces/categories";
import { fetchCategoriesIfNeeded } from "../../net/categories";
import { RootState } from "../../redux";

type Props = {
  categories: CategoriesState;
  dispatch: Function;
  match: any;
};

function Home(props: Props) {
  const { categories, dispatch, match } = props;
  const { items } = categories;
  const url = match ? match.url : "";

  useEffect(() => {
    dispatch(fetchCategoriesIfNeeded());
  }, [dispatch]);

  if (items.length === 0) {
    return null;
  }

  return (
    <div>
      <Header url={url} />
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
