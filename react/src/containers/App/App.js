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
    const { cart, categories, dispatch, match } = this.props;
    const details = () => {
      const url = match.url;

      if (url.startsWith("/category")) {
        const { category } = this.props;
        return (
          <Products
            categories={category.categories}
            category={category.category}
            dispatch={dispatch}
            products={category.products}
          />
        );
      }

      return <Categories categories={categories.items} />;
    };

    return (
      <div>
        <Header cart={cart} />
        {details()}
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { cart, category, categories } = state;

  return {
    cart,
    category,
    categories
  };
};

export default connect(mapStateToProps)(App);
