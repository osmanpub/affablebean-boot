import React, { Component } from "react";
import { connect } from "react-redux";
import Categories from "../../components/Categories";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { fetchCategoriesIfNeeded } from "../../net/categories";

export class Checkout extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCategoriesIfNeeded());
  }

  render() {
    const { cart, categories } = this.props;
    const { items } = categories;

    if (items.length === 0) {
      return null;
    }

    return (
      <div>
        <Header cart={cart} />
        <Categories categories={items} />
        <Footer />
      </div>
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

export default connect(mapStateToProps)(Checkout);
