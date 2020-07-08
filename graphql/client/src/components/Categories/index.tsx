import { useQuery } from "@apollo/react-hooks";
import React from "react";
import { getId } from "../../helpers/utils";
import { CategoryState } from "../../interfaces/categories";
import { GET_CATEGORIES } from "../../queries";
import Category from "../Category";
import {
  CategoriesGreeting,
  CategoriesLeft,
  CategoriesRight,
  CategoriesWelcome,
} from "./Categories.styles";

function Categories() {
  const { data } = useQuery(GET_CATEGORIES);

  if (!data) {
    return null;
  }

  const { categories } = data;

  if (!categories || !categories.length) {
    return null;
  }

  const categoriesList = categories.map((category: CategoryState) => (
    <Category key={getId(category)} category={category} />
  ));

  return (
    <div>
      <CategoriesLeft>
        <CategoriesWelcome>
          <CategoriesGreeting data-cy="home-welcome" data-testid="home-welcome">
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

export default Categories;
