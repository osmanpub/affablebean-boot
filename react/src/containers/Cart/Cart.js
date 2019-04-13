import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import CartItem from "../../components/CartItem";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { updateProductInCart } from "../../net/cart";
import {
  ActionBar,
  CartHdr,
  CartTable,
  ShoppingCart,
  Subtotal
} from "./Cart.styles";
import { clearCart } from "../../actions";

export class Cart extends Component {
  constructor(props) {
    super(props);
    this.updateCart = this.updateCart.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { cart, dispatch, match } = this.props;
    const { params } = match;

    if (cart.numberOfItems > 0 && params.clear === "true") {
      dispatch(clearCart());
    }
  }

  updateCart(id, qty) {
    const { dispatch } = this.props;
    dispatch(updateProductInCart(id, qty));
  }

  render() {
    const { cart } = this.props;
    const { numberOfItems } = cart;

    const items = cart.items.map(item => (
      <CartItem key={item.product.id} item={item} />
    ));

    return (
      <div>
        <Header cart={cart} />
        <div className="singleColumn">
          {numberOfItems === 0
            ? "Your shopping cart is empty"
            : "Your shopping cart contains " + numberOfItems + " items"}
          <ActionBar>
            <Link className={`bubble hMargin`} to={"/viewCart/true"}>
              clear cart
            </Link>
            <Link className={`bubble hMargin`} to={"/"}>
              continue shopping
            </Link>
          </ActionBar>
          <ShoppingCart {...cart}>
            <Subtotal>
              subtotal &euro;
              {cart.subtotal}
            </Subtotal>
            <CartTable>
              <tbody>
                <CartHdr>
                  <th>product</th>
                  <th>name</th>
                  <th>price</th>
                  <th>quantity</th>
                </CartHdr>
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

const mapStateToProps = state => {
  const { cart } = state;

  return {
    cart
  };
};

export default connect(mapStateToProps)(Cart);
