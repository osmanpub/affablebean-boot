import React, { Component } from "react";
import { updateProductInCart } from "../../net/cart";
import { CartTableTd } from "./CartItem.styles";
import { CartItemProps } from "../../interfaces/props";
import { CartItemState } from "../../interfaces/state";
import { Product } from "../../interfaces/categories";

export class CartItem extends Component<CartItemProps, CartItemState> {
  constructor(props: CartItemProps) {
    super(props);
    const { item } = this.props;

    this.state = {
      qty: item.quantity
    };
  }

  handleChange = (event: any) => {
    const input = event.target;
    let qty = Number(input.value);

    if (qty >= 0 && qty <= 10) {
      this.setState({ qty: qty });
    } else {
      input.value = this.state.qty;
    }
  };

  handleSubmit = (event: any) => {
    event.preventDefault();
    const { dispatch, item } = this.props;
    const product: Product = item.product;
    dispatch(updateProductInCart(product.id, Number(this.state.qty)));
  };

  render() {
    const { index, item } = this.props;
    const { product } = item;
    const name = product.name;
    const rowCol = index % 2 === 0 ? "white" : "lightBlue";
    const inputStyle: object = {
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
                maxLength={2}
                onChange={this.handleChange}
                size={2}
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
