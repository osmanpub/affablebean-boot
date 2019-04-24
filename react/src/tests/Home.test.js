import React from "react";
import ReactDOM from "react-dom";
import { configureStore } from "redux-starter-kit";
import { Provider } from "react-redux";
import Home from "../containers/Home";
import reducer from "../reducers";

it("renders without crashing", () => {
  const div = document.createElement("div");
  const store = configureStore({
    reducer
  });

  const test = (
    <Provider store={store}>
      <Home />
    </Provider>
  );

  ReactDOM.render(test, div);
  ReactDOM.unmountComponentAtNode(div);
});
