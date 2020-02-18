import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {connect} from 'react-redux';
import {Cart} from '../../interfaces/cart';
import {RootState} from '../../redux';

type Props = {
  cart: Cart;
  currentScreen: string;
  setScreen: Function;
};

function Header(props: Props) {
  const {cart, currentScreen, setScreen} = props;

  let cartWidget = null;
  let checkoutWidget = null;

  if (cart && cart.numberOfItems > 0) {
    if (currentScreen !== 'Cart') {
      cartWidget = (
        <TouchableHighlight onPress={() => setScreen('Cart')}>
          <Text style={styles.checkout}>view cart</Text>
        </TouchableHighlight>
      );
    }

    if (currentScreen !== 'Checkout') {
      checkoutWidget = (
        <TouchableWithoutFeedback onPress={() => setScreen('Checkout')}>
          <Text style={styles.viewCart}>checkout</Text>
        </TouchableWithoutFeedback>
      );
    }
  }

  return (
    <View
      style={{
        alignItems: 'center',
      }}>
      <TouchableWithoutFeedback onPress={() => setScreen('Home')}>
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

const mapStateToProps = (state: RootState) => ({
  cart: state.cart,
});

export default connect(mapStateToProps)(Header);
