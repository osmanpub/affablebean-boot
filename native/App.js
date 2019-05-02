import React, { Component } from "react";
import { Provider } from "react-redux";
import { configureStore } from "redux-starter-kit";
import reducer from "./src/reducers";
import { Home } from "./src/containers/Home";

const store = configureStore({
  reducer
});

export default class AffablebeanApp extends Component {
  render() {
    return (
      <React.StrictMode>
        <Provider store={store}>
          <Home />
        </Provider>
      </React.StrictMode>
    );
  }
}
