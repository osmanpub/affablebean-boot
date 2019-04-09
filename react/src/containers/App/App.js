import React, { Component } from "react";
import { connect } from "react-redux";
import Categories from "../../components/Categories";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Products from "../../components/Products";
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

  componentDidUpdate(prevProps) {
    const { category, dispatch, match } = this.props;
    const { params } = match;
    const id = params.id;

    if (category.categories.length > 0 && Number(id) !== category.category.id) {
      dispatch(fetchCategoryIfNeeded(id));
    }
  }

  render() {
    const { match } = this.props;
    const details = () => {
      const url = match.url;

      if (url.startsWith("/category")) {
        const { category } = this.props;
        return (
          <Products
            categories={category.categories}
            category={category.category}
            products={category.products}
          />
        );
      }

      const { categories } = this.props;
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
  const { category, categories } = state;

  return {
    category,
    categories
  };
};

export default connect(mapStateToProps)(App);
