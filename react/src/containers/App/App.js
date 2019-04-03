import React, { Component } from "react";
import { fetchCategories } from "../../rest";

class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCategories());
  }

  render() {
    const {
      categories
    } = this.props;

    return <CategoryList categories={categories} />;
  }
}

function CategoryList(props) {
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

const mapStateToProps = (state) => {
  const { categories } = state;

  return {
    categories
  };
};

export default connect(mapStateToProps)(App);

export default App;
