import React, { Component } from "react";
import { connect } from "react-redux";
import Categories from "../../components/Categories";
import { fetchCategoryIfNeeded } from "../../rest/category";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

export class Products extends Component {
  componentDidMount() {
    const { dispatch } = this.props;    
    dispatch(fetchCategoryIfNeeded());
  }

  // 3 renders on start is too much - investigate
  render() {
    const { categories, match }= this.props;

    return (
        <Header />
        {!match && <Categories categories={categories.items} />}
        <Footer />
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
