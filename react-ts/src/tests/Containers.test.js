import React from "react";
import ReactDOM from "react-dom";
import { configureStore } from "redux-starter-kit";
import { Provider } from "react-redux";
import Cart from "../containers/Cart";
import CategoryProducts from "../containers/CategoryProducts";
import Checkout from "../containers/Checkout";
import Contact from "../containers/Contact";
import Home from "../containers/Home";
import Privacy from "../containers/Privacy";
import reducer from "../reducers";

function test(container) {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    const store = configureStore({
      reducer
    });

    const testContainer = <Provider store={store}>container</Provider>;

    ReactDOM.render(testContainer, div);
    ReactDOM.unmountComponentAtNode(div);
  });
}

test(<Cart />);
test(<CategoryProducts />);
test(<Checkout />);
test(<Contact />);
test(<Home />);
test(<Privacy />);
