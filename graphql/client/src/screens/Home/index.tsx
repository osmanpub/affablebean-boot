import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Categories from "../../components/Categories";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { Categories as CategoriesState } from "../../interfaces/categories";
import { Match } from "../../interfaces/router";
import { fetchCategoriesIfNeeded } from "../../net/categories";

type Props = {
  categories: CategoriesState;
  match: Match;
};

function Home(props: Props) {
  const { categories, match } = props;
  const url = match ? match.url : "";
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategoriesIfNeeded());
  }, [dispatch, categories]);

  return (
    <div>
      <Header url={url} />
      {<Categories />}
      <Footer />
    </div>
  );
}

export default Home;
