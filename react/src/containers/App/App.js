import React, { Component } from "react";
import { connect } from "react-redux";
import Categories from "../../components/Categories";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { fetchCategoryIfNeeded } from "../../rest/category";
import { fetchCategoriesIfNeeded } from "../../rest/categories";

export class App extends Component {
  componentDidMount() {
    const { dispatch, match } = this.props;
    const { params } = match;
    const url = match.url;

    if (url.startsWith("/category")) {
      dispatch(fetchCategoryIfNeeded(params.id));
    } else {
      dispatch(fetchCategoriesIfNeeded());
    }
  }

  // 3 renders on start is too much - investigate
  render() {
    const { categories, match } = this.props;
    const details = () => {
      const url = match.url;

      if (url.startsWith("/category")) {
        return "hello";
      }

      return <Categories categories={categories.items} />;
    };

    return (
      <div>
        <Header />
        {details()}
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { categories } = state;

  return {
    categories
  };
};

export default connect(mapStateToProps)(App);
