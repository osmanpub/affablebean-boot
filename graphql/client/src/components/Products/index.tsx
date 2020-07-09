import { useQuery } from "@apollo/react-hooks";
import React from "react";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getId } from "../../helpers/utils";
import { Cart } from "../../interfaces/cart";
import { CategoryState, ProductState } from "../../interfaces/categories";
import { ID } from "../../interfaces/id";
import { addProductToCart, updateProductInCart } from "../../net/cart";
import { GET_CATEGORY_PRODUCTS } from "../../graphql/queries";
import { RootState } from "../../redux";
import { clearPurchase } from "../../redux/purchase";
import "./Products.css";
import {
  CategoryTitle,
  ProductsLeft,
  ProductsRight,
  ProductsTable,
  SelectedCategory,
} from "./Products.styles";

type Props = {
  cart: Cart;
  clearPurchase: Function;
  id: string;
};

function Products(props: Props) {
  const { cart, clearPurchase, id } = props;
  const { data } = useQuery(GET_CATEGORY_PRODUCTS, { variables: { id } });
  const dispatch = useDispatch();

  if (!data || !data.category) {
    return null;
  }

  const { categories, category, products } = data.category;

  if (
    !categories ||
    !categories.length ||
    !category ||
    !products ||
    !products.length
  ) {
    return null;
  }

  const addToCart = (id: ID) => {
    const update = cart.items.filter((item) => getId(item.product) === id);

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

  const selectedCategory = category;

  const sidePanel = categories.map((category: CategoryState) => {
    const id = getId(category);
    const name = category.name;

    if (name === selectedCategory.name) {
      return (
        <SelectedCategory key={id} data-testid={`selected-${name}`}>
          <span className="categoryText">{name}</span>
        </SelectedCategory>
      );
    } else {
      return (
        <Link key={id} to={`/category/${id}`}>
          <span className="categoryButton">
            <span
              className="categoryText"
              data-cy={`category-${name}`}
              data-testid={`category-${name}`}
            >
              {name}
            </span>
          </span>
        </Link>
      );
    }
  });

  const productsList = products.map((product: ProductState, index: number) => {
    const id = getId(product);
    const name = product.name;
    const rowCol = index % 2 === 0 ? "white" : "lightBlue";

    return (
      <tr
        key={id}
        className={`${rowCol}`}
        data-cy={`product-${name}`}
        data-testid="product"
      >
        <td>
          <img src={`/static/img/products/${name}.png`} alt={name} />
        </td>

        <td data-testid={name}>
          {name}
          <br />
          <span className="smallText">{product.description}</span>
        </td>

        <td data-testid={`price-${name}`}>
          &euro;&nbsp;
          {product.price.toFixed(2)}
        </td>

        <td>&nbsp;&nbsp;</td>

        <td>
          <button
            className="btn btn-primary btn-sm"
            data-testid={`add-qty-${name}`}
            onClick={() => addToCart(id)}
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
  cart: state.cart,
});

const mapDispatchToProps = {
  clearPurchase,
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);
