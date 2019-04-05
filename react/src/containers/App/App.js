import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";
import Categories from "../../components/Categories";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Category from "../../containers/Category";
import { fetchCategoriesIfNeeded } from "../../rest/categories";

export class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCategoriesIfNeeded());
  }

  // 3 renders on start is too much - investigate
  render() {
    const { categories, match } = this.props;

    return (
      <Router>
        <Header />
        {!match && <Categories categories={categories.items} />}
        <Footer />
        <Route path="/category/:id" component={Category} />
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
