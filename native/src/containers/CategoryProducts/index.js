import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { ScrollView } from "react-native";
import Header from "../../components/Header";
import Products from "../../components/Products";
import { fetchCategoryIfNeeded } from "../../net/category";

class CategoryProducts extends Component {
  componentDidMount() {
    const { dispatch, id } = this.props;
    dispatch(fetchCategoryIfNeeded(id));
  }

  componentDidUpdate(prevProps) {
    const { category, dispatch, id } = this.props;

    if (category.categories.length > 0 && Number(id) !== category.category.id) {
      dispatch(fetchCategoryIfNeeded(id));
    }
  }

  render() {
    const { cart, category, dispatch, setScreen } = this.props;

    if (!category.category.hasOwnProperty("id")) {
      return null;
    }

    return (
      <ScrollView>
        <Header
          cart={cart}
          currentScreen="CategoryProducts"
          setScreen={setScreen}
        />
        <Products
          categories={category.categories}
          category={category.category}
          dispatch={dispatch}
          products={category.products}
        />
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  const { cart, category } = state;

  return {
    cart,
    category
  };
};

export const ConnectedCategoryProducts = connect(mapStateToProps)(
  CategoryProducts
);

CategoryProducts.propTypes = {
  cart: PropTypes.object,
  category: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  setScreen: PropTypes.func.isRequired
};
