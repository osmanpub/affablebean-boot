import React from "react";
import { connect } from "react-redux";
import CheckoutForm from "../../components/CheckoutForm";
import Confirmation from "../../components/Confirmation";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { Purchase } from "../../interfaces/purchase";
import { RootState } from "../../redux";

type Props = {
  match: any;
  purchase: Purchase;
};

function Checkout(props: Props) {
  const { match, purchase } = props;
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
  purchase: state.purchase
});

export default connect(mapStateToProps)(Checkout);
