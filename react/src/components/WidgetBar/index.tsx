import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Cart } from "../../interfaces/cart";
import { RootState } from "../../redux";
import "./WidgetBar.css";
import { Checkout, ViewCart, WidgetBarWrapper } from "./WidgetBar.styles";

type Props = {
  cart?: Cart;
  url: string;
};

export function WidgetBar(props: Props) {
  const { cart, url } = props;
  const viewCart = url.startsWith("/viewCart") ? (
    ""
  ) : (
    <Link
      className="bubble"
      to={"/viewCart/false"}
      data-cy="cart-hdr-view-cart"
    >
      view cart
    </Link>
  );
  const checkout = url.startsWith("/checkout") ? (
    ""
  ) : (
    <Checkout className="headerWidget" {...cart}>
      <Link className="bubble" to={"/checkout"} data-cy="proceed-checkout">
        proceed to checkout &#x279f;
      </Link>
    </Checkout>
  );

  return (
    <WidgetBarWrapper>
      {checkout}

      <ViewCart className="headerWidget" {...cart}>
        <span className="horizontalMargin" data-cy="cart-hdr-total">
          <img src="/static/img/cart.gif" alt="shopping cart icon" />
          &nbsp;
          {cart && cart.numberOfItems + " items"}
        </span>
        {viewCart}
      </ViewCart>
    </WidgetBarWrapper>
  );
}

const mapStateToProps = (state: RootState) => ({
  cart: state.cart
});

export default connect(mapStateToProps)(WidgetBar);
