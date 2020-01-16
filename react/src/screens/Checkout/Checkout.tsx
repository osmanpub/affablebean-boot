import React from "react";
import { connect } from "react-redux";
import CheckoutForm from "../../components/CheckoutForm";
import Confirmation from "../../components/Confirmation";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { Cart } from "../../interfaces/cart";
import { Purchase } from "../../interfaces/purchase";
import { RootState } from "../../redux";

type Props = {
  cart: Cart;
  match: any;
  purchase: Purchase;
};

export function Checkout(props: Props) {
  const { cart, match, purchase } = props;
  const { order } = purchase;
  const details = order.hasOwnProperty("customer") ? (
    <Confirmation order={order} />
  ) : (
    <CheckoutForm {...props} />
  );

  return (
    <div>
      <Header url={match.url} />
      {details}
      <Footer />
    </div>
  );
}

const mapStateToProps = (state: RootState) => ({
  cart: state.cart,
  purchase: state.purchase
});

export default connect(mapStateToProps)(Checkout);
