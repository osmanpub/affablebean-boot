import React from "react";

export function Category(props) {
  return (
    <tr>
      <td>{props.category.id}</td>
      <td>{props.category.name}</td>
    </tr>
  );
}
