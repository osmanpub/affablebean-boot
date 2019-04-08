import React from "react";
import { Link } from "react-router-dom";
import "./Products.css";
import {
  CategoryTitle,
  ProductsLeft,
  ProductsRight,
  ProductsTable,
  SelectedCategory
} from "./Products.styles";

export function Products(props) {
  const categories = props.categories;

  if (categories.length === 0) {
    return null;
  }

  const selectedCategory = props.category;

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
        <span className="categoryButton" key={key}>
          <Link to={"/category/" + category.id}>
            <span className="categoryText">{name}</span>
          </Link>
        </span>
      );
    }
  });

  const products = props.products._embedded.productList.map(
    (product, index) => {
      const name = product.name;

      return (
        <tr
          key={product._links.self.href}
          className="{index % 2 === 0 ? 'white' : 'lightBlue'}"
        >
          <td>
            <img
              src={"/static/img/products/" + name + ".png"}
              alt="{{product.name}"
            />
          </td>

          <td>
            <span>{name}</span>
            <br />
            <span className="smallText">{product.description}</span>
          </td>

          <td>
            &euro;&nbsp;
            {product.price}
          </td>

          <td>
            <form method="POST" action="/addToCart/{product.id}">
              <button type="submit" className="btn btn-primary btn-sm">
                <span>add</span>
              </button>
            </form>
          </td>
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
