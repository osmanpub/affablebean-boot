import React from "react";
import { Link } from "react-router-dom";
import "./Products.css";
import {
  CategoryTitle,
  ProductsLeft,
  ProductsRight,
  SelectedCategory
} from "./Products.styles";

export function Products(props) {
  const categories = props.categories;
  const products = props.products;
  const selectedCategory = props.category;

  if (categories.length === 0) {
    return null;
  }

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

  return (
    <div>
      <ProductsLeft>{sidePanel}</ProductsLeft>
      <ProductsRight>
        <CategoryTitle>{selectedCategory.name}</CategoryTitle>
      </ProductsRight>
    </div>

    // <div id="categoryRightColumn">

    // 	<p id="categoryTitle" th:utext="${selectedCategory.name}"></p>

    // 	<th:block th:each="promo : ${catProms}">
    // 		<span th:if="${promo.categoryId == selectedCategory.id}">
    // 			<span class="saleCat" th:text="#{pro__${promo.description}__}">
    // 			</span>
    // 		</span>
    // 	</th:block>

    // 	<table id="productTable" th:each="product, iterStat : ${categoryProducts}">

    // 		<tr th:class="${iterStat.odd} ? 'white' : 'lightBlue'" th:with="new_price=${product.price}">
    // 			<td>
    // 				<img th:src="@{__${prodPath}__/__${product.name}__.png}"
    // 					th:alt="#{${product.name}}">
    // 			</td>

    // 			<td>
    // 				<span th:text="#{${product.name}}"></span>
    // 				<br>
    // 				<span class="smallText" th:utext="#{__${product.name}__Description}">
    // 				</span>
    // 			</td>

    // 			<td>
    // 				&euro;
    // 				<span th:text="${#numbers.formatDecimal(product.price, 0, 'COMMA', 2, 'POINT')}">
    // 					10.00
    // 				</span>
    // 			</td>

    // 			<td>
    // 		       <form method="POST" th:action="@{/addToCart(id=${product.id}, catId=${selectedCategory.id})}">
    // 					<button type="submit" class="btn btn-primary btn-sm">
    // 						<span th:text="#{addToCart}"></span>
    // 					</button>
    // 		        </form>
    // 			</td>

    // 			<td>
    // 				<th:block th:each="promo : ${prodProms}">
    // 					<span th:if="${promo.productId == product.id}">
    // 						<span class = "productOffer" th:utext="${promo.description}">
    // 						</span>
    // 					</span>
    // 				</th:block>
    // 			</td>

    // 		</tr>
    // 	</table>
    // </div>
  );
}
