import React, { Component } from "react";
import { updateProductInCart } from "../../net/cart";
import { CartTableTd } from "./CartItem.styles";

export class CartItem extends Component {
  constructor(props) {
    super(props);
    const { item } = this.props;

    this.state = {
      qty: item.quantity
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const inputQty = event.target;
    let qty = Number(inputQty.value);

    if (qty >= 0 && qty <= 10) {
      this.setState({ qty: qty });
    } else {
      inputQty.value = this.state.qty;
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const { dispatch, item } = this.props;
    const { product } = item;
    dispatch(updateProductInCart(product.id, Number(this.state.qty)));
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
            {item.total.toFixed(2)}
            <br />
            {product.price}
          </CartTableTd>
          <CartTableTd>
            <form onSubmit={this.handleSubmit}>
              <input
                className="form-control"
                maxLength="2"
                onChange={this.handleChange}
                size="2"
                style={inputStyle}
                type="number"
                value={this.state.qty}
              />
              <button className="`btn btn-primary btn-sm`" type="submit">
                update
              </button>
            </form>
          </CartTableTd>
        </tr>
      </React.Fragment>
    );
  }
}
