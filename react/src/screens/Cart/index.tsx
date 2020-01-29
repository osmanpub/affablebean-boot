import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from "../../components/CartItem";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { Cart as CartState } from "../../interfaces/cart";
import { Match } from "../../interfaces/router";
import { RootState } from "../../redux";
import { clearCart } from "../../redux/cart";
import { ActionBar, CartTable, ShoppingCart, Subtotal } from "./Cart.styles";

type Props = {
  cart: CartState;
  clearCart: Function;
  match: Match;
};

function Cart(props: Props) {
  const { cart, clearCart, match } = props;
  const { numberOfItems } = cart;

  useEffect(() => {
    const { params } = match;

    if (cart.numberOfItems > 0 && params.clear === "true") {
      clearCart();
    }
  }, [cart.numberOfItems, clearCart, match]);

  const items = cart.items.map((item, index) => (
    <CartItem key={index} index={index} item={item} />
  ));

  const clear =
    numberOfItems === 0 ? (
      ""
    ) : (
      <Link
        className="bubble hMargin"
        to={"/viewCart/true"}
        data-cy="clear-cart"
      >
        clear cart
      </Link>
    );

  return (
    <div>
      <Header url={match.url} />
      <div className="singleColumn" data-cy="cart-info">
        {numberOfItems === 0
          ? "Your shopping cart is empty"
          : "Your shopping cart contains " + numberOfItems + " items"}
        <ActionBar>
          {clear}
          <Link className="bubble hMargin" to={"/"} data-cy="continue-shopping">
            continue shopping
          </Link>
        </ActionBar>
        <ShoppingCart {...cart}>
          <Subtotal>
            subtotal &euro;
            {cart.subtotal.toFixed(2)}
          </Subtotal>
          <CartTable>
            <tbody>
              <tr className="header">
                <th>product</th>
                <th>name</th>
                <th>price</th>
                <th>quantity</th>
              </tr>
              {items}
            </tbody>
          </CartTable>
        </ShoppingCart>
      </div>
      <Footer />
    </div>
  );
}

const mapStateToProps = (state: RootState) => ({
  cart: state.cart
});

const mapDispatchToProps = {
  clearCart
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
