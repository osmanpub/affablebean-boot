import React from "react";

export function Header(props) {
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
