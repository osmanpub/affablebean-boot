import React from "react";
import Category from "../Category";
import {
  CategoriesGreeting,
  CategoriesLeft,
  CategoriesRight,
  CategoriesWelcome
} from "./Categories.styles";
import { Category as ICategory } from "../../interfaces/categories";
import { CategoriesProps } from "../../interfaces/props";

export function Categories(props: CategoriesProps) {
  if (props == null || props.categories.length === 0) {
    return null;
  }

  const categories = props.categories.map((category: ICategory) => (
    <Category {...category} key={category.id} />
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
      <CategoriesRight>{categories}</CategoriesRight>
    </div>
  );
}
