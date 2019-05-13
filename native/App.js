import React, { Component } from "react";
import { Provider } from "react-redux";
import { configureStore } from "redux-starter-kit";
import reducer from "./src/reducers";
import { ConnectedCategoryProducts } from "./src/containers/CategoryProducts";
import { ConnectedCart } from "./src/containers/Cart";
// import { ConnectedCheckout } from "./src/containers/Checkout";
import { ConnectedHome } from "./src/containers/Home";
import ErrorBoundary from "./src/components/ErrorBoundary";

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
    let nextScreen;

    switch (this.state.screen) {
      case "Cart":
        nextScreen = <ConnectedCart setScreen={this.setScreen} />;
        break;

      case "CategoryProducts":
        nextScreen = (
          <ConnectedCategoryProducts
            id={this.state.categoryId}
            setScreen={this.setScreen}
          />
        );
        break;

      // case "Checkout":
      //   nextScreen = (
      //     <ConnectedCheckout
      //       setScreen={this.setScreen}
      //     />
      //   );
      //   break;

      default:
        nextScreen = (
          <ConnectedHome
            setCategoryProduct={this.setCategoryProduct}
            setScreen={this.setScreen}
          />
        );
    }

    return (
      <ErrorBoundary>
        <Provider store={store}>{nextScreen}</Provider>
      </ErrorBoundary>
    );
  }
}
