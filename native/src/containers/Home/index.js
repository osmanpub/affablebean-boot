import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// import Categories from "../../components/Categories";
import Footer from "../../components/Footer";
// import Header from "../../components/Header";
import { fetchCategoriesIfNeeded } from "../../net/categories";

class Home extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCategoriesIfNeeded());
  }

  render() {
    const { cart, categories, match } = this.props;
    const { items } = categories;
    const url = match ? match.url : "";

    if (items.length === 0) {
      return null;
    }

    return (
      // <Header cart={cart} url={url} />
      // <Categories categories={items} />
      <Footer />
    );
  }
}

const mapStateToProps = state => {
  const { cart, categories } = state;

  return {
    cart,
    categories
  };
};

export const ConnectedHome = connect(mapStateToProps)(Home);

Home.propTypes = {
  cart: PropTypes.object,
  categories: PropTypes.object.isRequired,
  match: PropTypes.object
};
