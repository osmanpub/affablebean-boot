import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Checkout, ViewCart, WidgetBarWrapper } from "./WidgetBar.styles";
import "./WidgetBar.css";

export function WidgetBar(props) {
  const { cart, url } = props;
  const viewCart = url.startsWith("/viewCart") ? (
    ""
  ) : (
    <Link className="bubble" to={"/viewCart/false"}>
      view cart
    </Link>
  );
  const checkout = url.startsWith("/checkout") ? (
    ""
  ) : (
    <Checkout className="headerWidget" {...cart}>
      <Link className="bubble" to={"/checkout"}>
        proceed to checkout &#x279f;
      </Link>
    </Checkout>
  );

  return (
    <WidgetBarWrapper>
      {checkout}

      <ViewCart className="headerWidget" {...cart}>
        <span className="horizontalMargin">
          <img src="/static/img/cart.gif" alt="shopping cart icon" />
          &nbsp;
          {cart && cart.numberOfItems + " items"}
        </span>
        {viewCart}
      </ViewCart>
    </WidgetBarWrapper>
  );
}

WidgetBar.propTypes = {
  cart: PropTypes.object,
  url: PropTypes.string.isRequired
};
