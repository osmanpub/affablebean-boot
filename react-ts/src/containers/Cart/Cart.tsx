import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import CartItem from "../../components/CartItem";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { ActionBar, CartTable, ShoppingCart, Subtotal } from "./Cart.styles";
import { clearCart } from "../../actions";
import { Props } from "../../interfaces/props";
import { CartItem as ICartItem } from "../../interfaces/cart";

export class Cart extends Component<Props> {
  componentDidUpdate(prevProps: Props) {
    const { cart, dispatch, match } = this.props;
    const { params } = match;

    if (cart.numberOfItems > 0 && params.clear === "true") {
      dispatch(clearCart());
    }
  }

  render() {
    const { cart, dispatch, match } = this.props;
    const { numberOfItems } = cart;

    const items = cart.items.map((item: ICartItem, index) => (
      <CartItem key={index} dispatch={dispatch} index={index} item={item} />
    ));

    const clearCart =
      numberOfItems === 0 ? (
        ""
      ) : (
        <Link className="bubble hMargin" to={"/viewCart/true"}>
          clear cart
        </Link>
      );

    return (
      <div>
        <Header cart={cart} url={match.url} />
        <div className="singleColumn">
          {numberOfItems === 0
            ? "Your shopping cart is empty"
            : "Your shopping cart contains " + numberOfItems + " items"}
          <ActionBar>
            {clearCart}
            <Link className="bubble hMargin" to={"/"}>
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
}

const mapStateToProps = (state: Props) => {
  const { cart } = state;

  return {
    cart
  };
};

export default connect(mapStateToProps)(Cart);
