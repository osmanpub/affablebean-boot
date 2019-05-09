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

  getScreen = () => {
    return this.state.screen;
  };

  setCategoryProduct = categoryId => {
    this.setState({ categoryId: categoryId, screen: "CategoryProducts" });
  };

  setScreen = screen => {
    this.setState({ screen: screen });
  };

  render() {
    let screen;

    switch (this.state.screen) {
      case "CategoryProducts":
        screen = (
          <ConnectedCategoryProducts
            getScreen={this.getScreen}
            id={this.state.categoryId}
            setScreen={this.setScreen}
          />
        );
        break;

      default:
        screen = (
          <ConnectedHome
            getScreen={this.getScreen}
            setCategoryProduct={this.setCategoryProduct}
            setScreen={this.setScreen}
          />
        );
    }

    return <Provider store={store}>{screen}</Provider>;
  }
}
