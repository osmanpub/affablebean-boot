import React from "react";
import { Link } from "react-router-dom";
import "./Category.css";
import { Category as ICategory } from "../../interfaces/categories";

export function Category(props: ICategory) {
  const { id, name } = props;

  return (
    <span className="categoryBox">
      <Link to={`/category/${id}`}>
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
