import React, { Component } from "react";
import { connect } from "react-redux";
import Categories from "../../components/Categories";
import { fetchCategories } from "../../rest/categories.js";

export class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCategories());
  }

  render() {
    const categories = this.props.categories.items;
    return <Categories categories={categories} />;
  }
}

const mapStateToProps = state => {
  const { categories } = state;

  return {
    categories
  };
};

export default connect(mapStateToProps)(App);
