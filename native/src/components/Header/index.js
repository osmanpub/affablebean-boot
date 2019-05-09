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
  const { cart, getScreen, setScreen } = props;

  const styles = StyleSheet.create({
    logo: {
      resizeMode: "contain",
      width: 320
    },
    viewCart: {
      color: "blue",
      fontWeight: "bold"
    }
  });

  function goHome() {
    setScreen("Home");
  }

  function viewCartScreen() {}

  return (
    <View
      style={{
        alignItems: "center",
        background: "#f7f7e9"
      }}
    >
      {cart && cart.numberOfItems > 0 && (
        <TouchableHighlight onPress={viewCartScreen}>
          <Text style={styles.viewCart}>view cart</Text>
        </TouchableHighlight>
      )}

      <TouchableHighlight onPress={goHome}>
        <Image source={require("./logo.jpg")} style={styles.logo} />
      </TouchableHighlight>
    </View>
  );
}

Header.propTypes = {
  cart: PropTypes.object,
  getScreen: PropTypes.func.isRequired,
  setScreen: PropTypes.func.isRequired
};
