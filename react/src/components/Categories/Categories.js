import React from "react";
import Category from "../Category";

export function Categories(props) {
  if (props == null || props.categories.length === 0) {
    return null;
  }

  const categories = props.categories.map(category => (
    <Category key={category._links.self.href} category={category} />
  ));

  return (
    <table>
      <tbody>
        <tr>
          <th>Id</th>
          <th>Name</th>
        </tr>
        {categories}
      </tbody>
    </table>
  );
}
