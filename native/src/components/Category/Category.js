import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./Category.css";

export function Category(props) {
  const { category } = props;
  const { name } = category;

  return (
    <span className="categoryBox">
      <Link to={`/category/${category.id}`}>
        <span className="categoryLabel" />
        <span className="categoryLabelText">{name}</span>
        <img
          src={`/static/img/categories/${name}.jpg`}
          alt={name}
          className="categoryImage"
        />
      </Link>
    </span>
  );
}

Category.propTypes = {
  category: PropTypes.object.isRequired
};
