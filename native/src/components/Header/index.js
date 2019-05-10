import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from "react-native";
import PropTypes from "prop-types";

export default function Header(props) {
  const { cart, currentScreen, setScreen } = props;

  const styles = StyleSheet.create({
    checkout: {
      borderColor: "blue",
      borderRadius: 32,
      borderWidth: 1,
      color: "blue",
      fontWeight: "bold",
      padding: 8
    },
    logo: {
      margin: 16
    },
    viewCart: {
      borderColor: "blue",
      borderRadius: 32,
      borderWidth: 1,
      color: "blue",
      fontWeight: "bold",
      marginBottom: 16,
      marginLeft: 16,
      marginRight: 16,
      padding: 8
    }
  });

  function goHome() {
    setScreen("Home");
  }

  function viewCart() {
    if (currentScreen !== "Cart") {
      setScreen("Cart");
    }
  }

  function viewCheckout() {
    if (currentScreen !== "Checkout") {
      setScreen("Checkout");
    }
  }

  return (
    <View
      style={{
        alignItems: "center",
        background: "#f7f7e9"
      }}
    >
      <TouchableHighlight onPress={goHome}>
        <Image source={require("./logo.jpg")} style={styles.logo} />
      </TouchableHighlight>

      {cart && cart.numberOfItems > 0 && (
        <View style={{ flexDirection: "row" }}>
          <TouchableHighlight onPress={viewCart}>
            <Text style={styles.checkout}>view cart</Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={viewCheckout}>
            <Text style={styles.viewCart}>checkout</Text>
          </TouchableHighlight>
          <View style={{ flexDirection: "row", padding: 8 }}>
            <Image source={require("./cart.gif")} />
            <Text>&nbsp;{cart.numberOfItems}&nbsp;items</Text>
          </View>
        </View>
      )}
    </View>
  );
}

Header.propTypes = {
  cart: PropTypes.object,
  currentScreen: PropTypes.string.isRequired,
  setScreen: PropTypes.func.isRequired
};
