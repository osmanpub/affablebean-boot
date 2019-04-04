import React from "react";

export function Category(props) {
  return (
    <span>
      {props.category.id}
      &nbsp;
      {props.category.name}
      <br />
    </span>
  );
}

// 		<span class="categoryBox">
// 			<a th:href="@{/category(id=${category.id})}">
// 				<span class="categoryLabel"></span>
// 				<span class="categoryLabelText" th:text="#{${category.name}}"></span>
// 				<img th:src="@{__${imgPath}__/__${category.name}__.jpg}"
// 					th:alt="#{${category.name}}" class="categoryImage">
// 			</a>
// 		</span>
