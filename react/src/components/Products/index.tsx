import React from "react";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Cart } from "../../interfaces/cart";
import {
  Category,
  CategoryState,
  ProductState
} from "../../interfaces/categories";
import { addProductToCart, updateProductInCart } from "../../net/cart";
import { RootState } from "../../redux";
import { clearPurchase } from "../../redux/purchase";
import "./Products.css";
import {
  CategoryTitle,
  ProductsLeft,
  ProductsRight,
  ProductsTable,
  SelectedCategory
} from "./Products.styles";

type Props = {
  cart: Cart;
  categories: Array<CategoryState>;
  category: Category;
  clearPurchase: Function;
  products: Array<ProductState>;
};

export function Products(props: Props) {
  const { cart, categories, clearPurchase, products } = props;
  const dispatch = useDispatch();

  const addToCart = (id: number) => {
    const update = cart.items.filter(item => item.product.id === id);

    clearPurchase();
    dispatch(
      update.length > 0
        ? updateProductInCart(id, update[0].quantity + 1)
        : addProductToCart(id.toString())
    );
  };

  if (categories.length === 0) {
    return null;
  }

  const selectedCategory = props.category;

  const sidePanel = categories.map((category: CategoryState) => {
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

  const productsList = products.map((product: ProductState, index: number) => {
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
            className="btn btn-primary btn-sm"
            onClick={() => addToCart(product.id)}
          >
            add
          </button>
        </td>

        <td>&nbsp;&nbsp;</td>
      </tr>
    );
  });

  return (
    <div>
      <ProductsLeft>{sidePanel}</ProductsLeft>
      <ProductsRight>
        <CategoryTitle>{selectedCategory.name}</CategoryTitle>
        <ProductsTable>
          <tbody>{productsList}</tbody>
        </ProductsTable>
      </ProductsRight>
    </div>
  );
}

const mapStateToProps = (state: RootState) => ({
  cart: state.cart
});

const mapDispatchToProps = {
  clearPurchase
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);
