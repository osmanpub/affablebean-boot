import React from "react";
import PropTypes from "prop-types";
import Category from "../Category";
import {
  CategoriesGreeting,
  CategoriesLeft,
  CategoriesRight,
  CategoriesWelcome
} from "./Categories.styles";

export function Categories(props) {
  if (props == null || props.categories.length === 0) {
    return null;
  }

  const categories = props.categories.map(category => (
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

      <CategoriesRight>{categories}</CategoriesRight>
    </div>
  );
}

Categories.propTypes = {
  categories: PropTypes.array.isRequired
};
