import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from "../../components/CartItem";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { Cart as CartState } from "../../interfaces/cart";
import { Match } from "../../interfaces/router";
import { emptyCart } from "../../net/cart";
import { RootState } from "../../redux";
import { ActionBar, CartTable, ShoppingCart, Subtotal } from "./Cart.styles";

type Props = {
  cart: CartState;
  match: Match;
};

function Cart(props: Props) {
  const { cart, match } = props;
  const { numberOfItems } = cart;
  const dispatch = useDispatch();

  useEffect(() => {
    const { params } = match;

    if (cart.numberOfItems > 0 && params.clear === "true") {
      dispatch(emptyCart());
    }
  }, [cart.numberOfItems, dispatch, match]);

  const items = cart.items.map((item, index) => (
    <CartItem key={index} index={index} item={item} />
  ));

  const clear =
    numberOfItems === 0 ? (
      ""
    ) : (
      <Link
        className="bubble hMargin"
        data-cy="clear-cart"
        to={"/viewCart/true"}
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

export default connect(mapStateToProps)(Cart);
