import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./Category.css";

export default function Category(props) {
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

// .categoryBox {
//   height: 176px;
//   width: 212px;
//   margin: 21px 14px 6px;
//   float: inherit;
// }

// .categoryImage {
//   padding: 1px;
//   border: solid 1px #555;
// }

// .categoryLabel {
//   position: absolute;
//   background-color: #fff;
//   opacity: 0.7;
//   height: 40px;
//   width: 210px;
//   margin: 2px;
// }

// .categoryLabelText {
//   position: absolute;
//   line-height: 150%;
//   font-size: x-large;
//   margin: 3px 10px;
// }

// export const CategoriesGreeting = styled.p`
//   font-size larger;
// `;

// export const CategoriesLeft = styled.div`
//   text-align: left;
//   height: 400px;
//   width: 350px;
//   float: left;
// `;

// export const CategoriesRight = styled.div`
//   text-align: left;
//   height: 400px;
//   width: 720px;
//   float: left;
// `;

// export const CategoriesWelcome = styled.div`
//   margin: 30px 5px 0 30px;
//   line-height: 1.4em;
// `;
