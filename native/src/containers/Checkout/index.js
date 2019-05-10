import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import CheckoutForm from "../../components/CheckoutForm";
import Confirmation from "../../components/Confirmation";
import Header from "../../components/Header";

class Checkout extends Component {
  render() {
    const { cart, match, purchase } = this.props;
    const { order } = purchase;
    const details = order.hasOwnProperty("customer") ? (
      <Confirmation order={order} />
    ) : (
      <CheckoutForm {...this.props} />
    );

    return (
      <div>
        <Header cart={cart} url={match.url} />
        {details}
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { cart, purchase } = state;

  return {
    cart,
    purchase
  };
};

export const ConnectedCheckout = connect(mapStateToProps)(Checkout);

Checkout.propTypes = {
  cart: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
  purchase: PropTypes.object.isRequired,
  setScreen: PropTypes.func.isRequired
};
