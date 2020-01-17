import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import Categories from "../../components/Categories";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { Categories as CategoriesState } from "../../interfaces/categories";
import { Match } from "../../interfaces/router";
import { fetchCategoriesIfNeeded } from "../../net/categories";
import { RootState } from "../../redux";

type Props = {
  categories: CategoriesState;
  match: Match;
};

function Home(props: Props) {
  const { categories, match } = props;
  const { items } = categories;
  const url = match ? match.url : "";
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategoriesIfNeeded());
  }, [dispatch, categories]);

  if (items.length === 0) {
    return null;
  }

  return (
    <div>
      <Header url={url} />
      <Categories />
      <Footer />
    </div>
  );
}

const mapStateToProps = (state: RootState) => ({
  cart: state.cart,
  categories: state.categories
});

export default connect(mapStateToProps)(Home);
