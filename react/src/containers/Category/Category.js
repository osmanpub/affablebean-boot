import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchCategoryIfNeeded } from "../../rest/category";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

export class Category extends Component {
  componentDidMount() {
    const { dispatch, match } = this.props;
    const { params } = match;
    dispatch(fetchCategoryIfNeeded(params.id));
  }

  // 3 renders on start is too much - investigate
  render() {
    const { categories, match } = this.props;

    return (
      // <Header />
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

export default connect(mapStateToProps)(Category);
