import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import PropTypes from 'prop-types';

export default function Header(props) {
  const {cart, currentScreen, setScreen} = props;

  const styles = StyleSheet.create({
    checkout: {
      borderColor: 'blue',
      borderRadius: 32,
      borderWidth: 1,
      color: 'blue',
      fontWeight: 'bold',
      padding: 8,
    },
    logo: {
      margin: 16,
    },
    viewCart: {
      borderColor: 'blue',
      borderRadius: 32,
      borderWidth: 1,
      color: 'blue',
      fontWeight: 'bold',
      marginBottom: 16,
      marginLeft: 16,
      marginRight: 16,
      padding: 8,
    },
  });

  let cartWidget = null;
  let checkoutWidget = null;

  if (cart && cart.numberOfItems > 0) {
    if (currentScreen !== 'Cart') {
      cartWidget = (
        <TouchableHighlight onPress={viewCart}>
          <Text style={styles.checkout}>view cart</Text>
        </TouchableHighlight>
      );
    }

    if (currentScreen !== 'Checkout') {
      checkoutWidget = (
        <TouchableWithoutFeedback onPress={viewCheckout}>
          <Text style={styles.viewCart}>checkout</Text>
        </TouchableWithoutFeedback>
      );
    }
  }

  function goHome() {
    setScreen('Home');
  }

  function viewCart() {
    setScreen('Cart');
  }

  function viewCheckout() {
    setScreen('Checkout');
  }

  return (
    <View
      style={{
        alignItems: 'center',
      }}>
      <TouchableWithoutFeedback onPress={goHome}>
        <Image source={require('./logo.jpg')} style={styles.logo} />
      </TouchableWithoutFeedback>

      {cart && cart.numberOfItems > 0 && (
        <View style={{flexDirection: 'row'}}>
          {cartWidget}
          {checkoutWidget}
          <View style={{flexDirection: 'row', padding: 8}}>
            <Image source={require('./cart.gif')} />
            <Text>&nbsp;{cart.numberOfItems}&nbsp;items</Text>
          </View>
        </View>
      )}
    </View>
  );
}
