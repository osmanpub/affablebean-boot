import React from "react";
import { CategoryState } from "../../redux/categories";
import Category from "../Category";
import {
  CategoriesGreeting,
  CategoriesLeft,
  CategoriesRight,
  CategoriesWelcome
} from "./Categories.styles";

type Props = {
  categories: Array<CategoryState>;
};

export default function Categories(props: Props) {
  const { categories } = props;

  if (!categories || categories.length === 0) {
    return null;
  }

  const categoriesList = categories.map((category: CategoryState) => (
    <Category key={category._links.self.href} category={category} />
  ));

  return (
    <div>
      <CategoriesLeft>
        <CategoriesWelcome>
          <CategoriesGreeting>
            Welcome to the online home of the Affable Bean Green Grocer.
          </CategoriesGreeting>
          <p>
            Our unique home delivery service brings you fresh organic produce,
            dairy, meats, breads and other delicious and healthy items direct to
            your doorstep.
          </p>
        </CategoriesWelcome>
      </CategoriesLeft>

      <CategoriesRight>{categoriesList}</CategoriesRight>
    </div>
  );
}
