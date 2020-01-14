import React, { Component } from "react";
import { connect } from "react-redux";
import Categories from "../../components/Categories";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { fetchCategoriesIfNeeded } from "../../net/categories";

export class Home extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCategoriesIfNeeded());
  }

  render() {
    const { cart, categories, match } = this.props;
    const url = match ? match.url : "";

    if (categories.length === 0) {
      return null;
    }

    return (
      <div>
        <Header cart={cart} url={url} />
        <Categories categories={categories} />
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  cart: state.cart,
  categories: state.categories.items
});

export default connect(mapStateToProps)(Home);
