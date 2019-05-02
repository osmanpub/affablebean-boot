import React, { Component, lazy } from "react";
import { Provider } from "react-redux";
import { configureStore } from "redux-starter-kit";
import reducer from "./src/reducers";
import { Text, View } from "react-native";

const store = configureStore({
  reducer
});

// const Cart = lazy(() => import("./containers/Cart"));
// const CategoryProducts = lazy(() => import("./containers/CategoryProducts"));
// const Checkout = lazy(() => import("./containers/Checkout"));
// const Contact = lazy(() => import("./containers/Contact"));
// const Home = lazy(() => import("./src/containers/Home"));
// const Privacy = lazy(() => import("./containers/Privacy"));

export default class AffablebeanApp extends Component {
  render() {
    return (
      <React.StrictMode>
        <Provider store={store}>
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text>Hello, world!</Text>
          </View>
        </Provider>
      </React.StrictMode>
    );
  }
}
