import React from "react";
import { Link } from "react-router-dom";
import "./Category.css";

export function Category(props) {
  const category = props.category;
  const name = category.name;

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
