import React, { Component } from "react";
import { connect } from "react-redux";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { updateProductInCart } from "../../rest/cart";
import { EmptyCart } from "./Cart.styles";

export class Cart extends Component {
  constructor(props) {
    super(props);
    this.updateCart = this.updateCart.bind(this);
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
          <EmptyCart {...cart}>
            {numberOfItems === 0
              ? "Your shopping cart is empty"
              : "Your shopping cart contains " + numberOfItems + "items"}
          </EmptyCart>
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
