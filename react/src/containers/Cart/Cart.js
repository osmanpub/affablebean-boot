import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { updateProductInCart } from "../../rest/cart";
import { ActionBar } from "./Cart.styles";
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
          {/* <button
            className="btn btn-primary btn-sm"
            onClick={this.updateCart.bind(this, product.id, 1)}
          >
            update
          </button> */}
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
