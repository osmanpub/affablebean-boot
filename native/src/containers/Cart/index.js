import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { ScrollView } from "react-native";
import CartItem from "../../components/CartItem";
import Header from "../../components/Header";

class Cart extends Component {
  render() {
    const { cart, dispatch, setScreen } = this.props;

    const cartItems = cart.items.map((item, index) => (
      <CartItem key={index} dispatch={dispatch} item={item} />
    ));

    return (
      <ScrollView>
        <Header cart={cart} currentScreen="Cart" setScreen={setScreen} />
        {cartItems}
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  const { cart } = state;

  return {
    cart
  };
};

export const ConnectedCart = connect(mapStateToProps)(Cart);

Cart.propTypes = {
  cart: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
  setScreen: PropTypes.func.isRequired
};
