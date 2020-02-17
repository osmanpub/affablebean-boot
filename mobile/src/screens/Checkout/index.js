import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import CheckoutForm from '../../components/CheckoutForm';
import Confirmation from '../../components/Confirmation';
import Header from '../../components/Header';
import {ScrollView} from 'react-native';

class Checkout extends Component {
  render() {
    const {cart, purchase, setScreen} = this.props;
    const {order} = purchase;
    const details = order.hasOwnProperty('customer') ? (
      <Confirmation order={order} />
    ) : (
      <CheckoutForm {...this.props} />
    );

    return (
      <ScrollView>
        <Header cart={cart} currentScreen="Checkout" setScreen={setScreen} />
        {details}
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  const {cart, purchase} = state;

  return {
    cart,
    purchase,
  };
};

export const ConnectedCheckout = connect(mapStateToProps)(Checkout);

Checkout.propTypes = {
  cart: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
  purchase: PropTypes.object.isRequired,
  setScreen: PropTypes.func.isRequired,
};
