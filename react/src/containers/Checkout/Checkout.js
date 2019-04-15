import React, { Component } from "react";
import { connect } from "react-redux";
import CheckoutForm from "../../components/CheckoutForm";
import Confirmation from "../../components/Confirmation";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

export class Checkout extends Component {
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

export default connect(mapStateToProps)(Checkout);
