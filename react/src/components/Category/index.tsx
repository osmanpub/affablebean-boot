import React from "react";
import { Link } from "react-router-dom";
import "./Category.css";
import { Category as CategoryState } from "../../interfaces/categories";

type Props = {
  category: CategoryState;
};

export default function Category(props: Props) {
  const { category } = props;
  const { name } = category;

  return (
    <span className="categoryBox">
      <Link to={`/category/${category.id}`}>
        <span className="categoryLabel" />
        <span className="categoryLabelText">{name}</span>
        <img
          data-cy={`category-${name}`}
          src={`/static/img/categories/${name}.jpg`}
          alt={name}
          className="categoryImage"
        />
      </Link>
    </span>
  );
}
