import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import PropTypes from "prop-types";

export default function Header(props) {
  const { cart, getScreen, setScreen } = props;

  const styles = StyleSheet.create({
    logo: {
      resizeMode: "contain",
      width: 320
    }
  });

  function goHome() {
    setScreen("Home");
  }

  return (
    <View
      style={{
        alignItems: "center",
        background: "#f7f7e9",
        flex: 1
      }}
    >
      <TouchableOpacity activeOpacity={0.5} onPress={goHome}>
        <Image source={require("./logo.jpg")} style={styles.logo} />
      </TouchableOpacity>
    </View>
  );
}

Header.propTypes = {
  cart: PropTypes.object,
  getScreen: PropTypes.func.isRequired,
  setScreen: PropTypes.func.isRequired
};
