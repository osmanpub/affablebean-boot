import React from "react";
import { connect } from "react-redux";
import {
  Categories as CategoriesState,
  CategoryState
} from "../../interfaces/categories";
import { RootState } from "../../redux";
import Category from "../Category";
import {
  CategoriesGreeting,
  CategoriesLeft,
  CategoriesRight,
  CategoriesWelcome
} from "./Categories.styles";

type Props = {
  categories: CategoriesState;
};

function Categories(props: Props) {
  const { categories } = props;
  const { items } = categories;

  if (items.length === 0) {
    return null;
  }

  const categoriesList = items.map((category: CategoryState) => (
    <Category key={category._links.self.href} category={category} />
  ));

  return (
    <div>
      <CategoriesLeft>
        <CategoriesWelcome>
          <CategoriesGreeting data-cy="home-welcome">
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

const mapStateToProps = (state: RootState) => ({
  categories: state.categories
});

export default connect(mapStateToProps)(Categories);
