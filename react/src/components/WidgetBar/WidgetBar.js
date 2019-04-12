import React from "react";
import { Link } from "react-router-dom";
import { Checkout, ViewCart, WidgetBarWrapper } from "./WidgetBar.styles";
import "./WidgetBar.css";

export function WidgetBar(props) {
  const cart = props.cart;

  return (
    <WidgetBarWrapper>
      <Checkout className="headerWidget" {...cart}>
        <div>
          <Link className="bubble" to={"/checkout"}>
            proceed to checkout &#x279f;
          </Link>
        </div>
      </Checkout>

      <ViewCart className="headerWidget" {...cart}>
        <span className="horizontalMargin">
          <img src="/static/img/cart.gif" alt="shopping cart icon" />
          &nbsp;
          {cart && cart.numberOfItems + " items"}
        </span>

        <Link className="bubble" to={"/viewCart/false"}>
          view cart
        </Link>
      </ViewCart>
    </WidgetBarWrapper>
  );
}
