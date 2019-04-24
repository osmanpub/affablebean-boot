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
    const { items } = categories;

    if (items.length === 0) {
      return null;
    }

    return (
      <div>
        <span id="hello">hello</span>
        <Header cart={cart} url={match.url} />
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

export default connect(mapStateToProps)(Home);
