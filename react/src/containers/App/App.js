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

  render() {
    const { match } = this.props;
    const details = () => {
      const url = match.url;

      if (url.startsWith("/category")) {
        const { category } = this.props;
        return (
          <Products
            selectedCategory={category.selectedCategory}
            categories={category.categories}
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
