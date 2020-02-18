import React from 'react';
import {ScrollView} from 'react-native';
import {connect} from 'react-redux';
import CheckoutForm from '../../components/CheckoutForm';
import Confirmation from '../../components/Confirmation';
import Header from '../../components/Header';
import {Purchase} from '../../interfaces/purchase';
import {RootState} from '../../redux';

type Props = {
  purchase: Purchase;
  setScreen: Function;
};

function Checkout(props: Props) {
  const {purchase, setScreen} = props;
  const {order} = purchase;
  const details = order.hasOwnProperty('customer') ? (
    <Confirmation order={order} />
  ) : (
    <CheckoutForm {...props} />
  );

  return (
    <ScrollView>
      <Header currentScreen="Checkout" setScreen={setScreen} />
      {details}
    </ScrollView>
  );
}

const mapStateToProps = (state: RootState) => ({
  purchase: state.purchase,
});

export default connect(mapStateToProps)(Checkout);
