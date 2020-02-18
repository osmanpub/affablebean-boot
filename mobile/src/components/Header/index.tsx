import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {connect, useDispatch} from 'react-redux';
import {Cart} from '../../interfaces/cart';
import {emptyCart} from '../../net/cart';
import {RootState} from '../../redux';

type Props = {
  cart: Cart;
  currentScreen: string;
  setScreen: Function;
};

function Header(props: Props) {
  const {cart, currentScreen, setScreen} = props;
  const dispatch = useDispatch();

  const clearCart = () => {
    if (cart.numberOfItems > 0) {
      dispatch(
        emptyCart(() => {
          if (currentScreen === 'Cart') {
            setScreen('Home');
          }
        }),
      );
    }
  };

  let cartWidget = null;
  let checkoutWidget = null;

  if (cart && cart.numberOfItems > 0) {
    if (currentScreen !== 'Cart') {
      cartWidget = (
        <TouchableHighlight onPress={() => setScreen('Cart')}>
          <Text style={styles.button}>view cart</Text>
        </TouchableHighlight>
      );
    }

    if (currentScreen !== 'Checkout') {
      checkoutWidget = (
        <TouchableWithoutFeedback onPress={() => setScreen('Checkout')}>
          <Text style={styles.button}>checkout</Text>
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
        <View>
          <View style={{flexDirection: 'row', paddingBottom: 16}}>
            <TouchableHighlight onPress={clearCart}>
              <Text style={styles.button}>clear cart</Text>
            </TouchableHighlight>
            {cartWidget}
            {checkoutWidget}
          </View>
          <View style={styles.cart}>
            <Image source={require('./cart.gif')} />
            <Text>&nbsp;{cart.numberOfItems}&nbsp;items</Text>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    borderColor: 'blue',
    borderRadius: 32,
    borderWidth: 1,
    color: 'blue',
    fontWeight: 'bold',
    marginHorizontal: 8,
    padding: 12,
  },
  cart: {
    flexDirection: 'row',
    paddingBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    margin: 16,
  },
});

const mapStateToProps = (state: RootState) => ({
  cart: state.cart,
});

export default connect(mapStateToProps)(Header);
