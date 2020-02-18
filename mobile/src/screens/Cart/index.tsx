import React from 'react';
import {ScrollView} from 'react-native';
import {connect} from 'react-redux';
import CartItem from '../../components/CartItem';
import Header from '../../components/Header';
import {Cart as CartState} from '../../interfaces/cart';
import {RootState} from '../../redux';

type Props = {
  cart: CartState;
  setScreen: Function;
};

function Cart(props: Props) {
  const {cart, setScreen} = props;

  if (cart.numberOfItems === 0) {
    setScreen('Home');
    return null;
  }

  const cartItems = cart.items.map((item, index) => (
    <CartItem key={index} item={item} />
  ));

  return (
    <ScrollView>
      <Header currentScreen="Cart" setScreen={setScreen} />
      {cartItems}
    </ScrollView>
  );
}

const mapStateToProps = (state: RootState) => ({
  cart: state.cart,
});

export default connect(mapStateToProps)(Cart);
