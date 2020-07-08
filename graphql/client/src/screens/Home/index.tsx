import React from "react";
import Categories from "../../components/Categories";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { Categories as CategoriesState } from "../../interfaces/categories";
import { Match } from "../../interfaces/router";

type Props = {
  categories: CategoriesState;
  match: Match;
};

function Home(props: Props) {
  const { match } = props;
  const url = match ? match.url : "";

  return (
    <div>
      <Header url={url} />
      {<Categories />}
      <Footer />
    </div>
  );
}

export default Home;
