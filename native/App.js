import React, { Component } from "react";
import { Provider } from "react-redux";
import { configureStore } from "redux-starter-kit";
import reducer from "./src/reducers";
import { ConnectedHome } from "./src/containers/Home";

export default class AffablebeanApp extends Component {
  render() {
    const store = configureStore({
      reducer
    });

    return (
      <React.StrictMode>
        <Provider store={store}>
          <ConnectedHome />
        </Provider>
      </React.StrictMode>
    );
  }
}
