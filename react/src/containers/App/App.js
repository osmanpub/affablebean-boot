import React, { Component } from "react";
import { connect } from "react-redux";
import Categories from "../../components/Categories";
import Footer from "../../components/Footer";
import { fetchCategories } from "../../rest/categories.js";

export class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCategories());
  }

  render() {
    const categories = this.props.categories.items;

    return (
      <div>
        <Categories categories={categories} />
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
