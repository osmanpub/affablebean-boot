import React from "react";
import { Link } from "react-router-dom";
import { getId } from "../../helpers/utils";
import { Category as CategoryState } from "../../interfaces/categories";
import "./Category.css";

type Props = {
  category: CategoryState;
};

export default function Category(props: Props) {
  const { category } = props;
  const { name } = category;
  const id = getId(category);

  return (
    <span className="categoryBox" data-testid="categoryBox">
      <Link to={`/category/${id}`}>
        <span className="categoryLabel" />
        <span className="categoryLabelText">{name}</span>
        <img
          alt={name}
          className="categoryImage"
          data-cy={`category-${name}`}
          data-testid={`category-${name}`}
          src={`/static/img/categories/${name}.jpg`}
        />
      </Link>
    </span>
  );
}
