import React, { Component } from "react";
import { updateProductInCart } from "../../net/cart";
import { CartTableTd } from "./CartItem.styles";

export class CartItem extends Component {
  constructor(props) {
    super(props);
    this.state = { qty: 0 };
    this.updateCart = this.updateCart.bind(this);
  }

  updateCart(id, qty) {
    const { dispatch } = this.props;
    dispatch(updateProductInCart(id, qty));
  }

  render() {
    const { index, item } = this.props;
    const { product } = item;
    const name = product.name;
    const rowCol = index % 2 === 0 ? "white" : "lightBlue";
    const inputStyle = {
      margin: "5px",
      textAlign: "center"
    };

    return (
      <React.Fragment>
        <tr className={`${rowCol}`}>
          <CartTableTd>
            <img src={`/static/img/products/${name}.png`} alt="{name}" />
          </CartTableTd>
          <CartTableTd>{name}</CartTableTd>
          <CartTableTd>
            &euro;
            {item.total}
            <br />
            {product.price}
          </CartTableTd>
          <CartTableTd>&nbsp;&nbsp;</CartTableTd>
          <CartTableTd>
            <div className="form-group">
              <div className="col-sm-10">
                <input
                  type="number"
                  className="form-control"
                  maxLength="2"
                  size="2"
                  style={inputStyle}
                  value="{this.state.qty}"
                />
              </div>
            </div>
            <button
              className="`btn btn-primary btn-sm`"
              onClick={this.updateCart.bind(this, product.id, 0)}
            >
              update
            </button>
          </CartTableTd>
        </tr>
      </React.Fragment>
    );
  }
}
