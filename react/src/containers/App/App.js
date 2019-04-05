import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";
import Categories from "../../components/Categories";
import { fetchCategoriesIfNeeded } from "../../rest/categories";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

export class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCategoriesIfNeeded());
  }

  render() {
    const categories = this.props.categories.items;
    const match = this.props.match;

    return (
      <Router>
        <Header />
        {!match && <Categories categories={categories} />}
        <Footer />
        <Route path="/category/:id" component={App} />
      </Router>
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
