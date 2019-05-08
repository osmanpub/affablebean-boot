import React, { Component } from "react";
import { Provider } from "react-redux";
import { configureStore } from "redux-starter-kit";
import reducer from "./src/reducers";
import { ConnectedCategoryProducts } from "./src/containers/CategoryProducts";
import { ConnectedHome } from "./src/containers/Home";

const store = configureStore({
  reducer
});

export default class AffablebeanApp extends Component {
  constructor(props) {
    super(props);
    this.state = { categoryId: 0, screen: "Home" };
  }

  setCategoryProduct = categoryId => {
    this.setState({ categoryId: categoryId, screen: "CategoryProducts" });
  };

  setScreen = screen => {
    this.setState({ screen: screen });
  };

  render() {
    let screen = <ConnectedHome setCategoryProduct={this.setCategoryProduct} />;

    switch (this.state.screen) {
      case "CategoryProducts":
        screen = (
          <ConnectedCategoryProducts
            setScreen={this.setScreen}
            id={this.state.categoryId}
          />
        );
        break;

      default:
    }

    return <Provider store={store}>{screen}</Provider>;
  }
}
