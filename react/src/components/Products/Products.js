import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Products.css";
import { addProductToCart } from "../../net/cart";
import {
  CategoryTitle,
  ProductsLeft,
  ProductsRight,
  ProductsTable,
  SelectedCategory
} from "./Products.styles";

export class Products extends Component {
  constructor(props) {
    super(props);
    this.addToCart = this.addToCart.bind(this);
  }

  addToCart(id) {
    const { dispatch } = this.props;
    dispatch(addProductToCart(id));
  }

  render() {
    const { categories } = this.props;

    if (categories.length === 0) {
      return null;
    }

    const selectedCategory = this.props.category;

    const sidePanel = categories.map(category => {
      const key = category._links.self.href;
      const name = category.name;

      if (name === selectedCategory.name) {
        return (
          <SelectedCategory key={key}>
            <span className="categoryText">{name}</span>
          </SelectedCategory>
        );
      } else {
        return (
          <Link key={key} to={`/category/${category.id}`}>
            <span className="categoryButton">
              <span className="categoryText">{name}</span>
            </span>
          </Link>
        );
      }
    });

    const products = this.props.products._embedded.productList.map(
      (product, index) => {
        const name = product.name;
        const rowCol = index % 2 === 0 ? "white" : "lightBlue";

        return (
          <tr key={product._links.self.href} className={`${rowCol}`}>
            <td>
              <img src={`/static/img/products/${name}.png`} alt="{name}" />
            </td>

            <td>
              {name}
              <br />
              <span className="smallText">{product.description}</span>
            </td>

            <td>
              &euro;&nbsp;
              {product.price.toFixed(2)}
            </td>

            <td>&nbsp;&nbsp;</td>

            <td>
              <button
                className="`btn btn-primary btn-sm`"
                onClick={this.addToCart.bind(this, product.id)}
              >
                add
              </button>
            </td>

            <td>&nbsp;&nbsp;</td>
          </tr>
        );
      }
    );

    return (
      <div>
        <ProductsLeft>{sidePanel}</ProductsLeft>
        <ProductsRight>
          <CategoryTitle>{selectedCategory.name}</CategoryTitle>
          <ProductsTable>
            <tbody>{products}</tbody>
          </ProductsTable>
        </ProductsRight>
      </div>
    );
  }
}
