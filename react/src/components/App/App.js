import React, { useState, useEffect } from "react";
import { client, getPath } from "../../utils.js";

function App() {
  const [categories, setCategories] = useState(0);

  useEffect(() => {
    client
      .get(getPath("categories"), function(data) {
        setCategories(data._embedded.categoryList);
      })
      .on("error", function(err) {
        console.log("something went wrong on the request", err.request.options);
      });
  });

  return <CategoryList categories={categories} />;
}

function CategoryList(props) {
  if (!props || !Array.isArray(props.categories)) {
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

function Category(props) {
  return (
    <tr>
      <td>{props.category.id}</td>
      <td>{props.category.name}</td>
    </tr>
  );
}

export default App;
