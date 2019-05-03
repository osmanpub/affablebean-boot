import React from "react";
import { Image, StyleSheet, View } from "react-native";
import PropTypes from "prop-types";

export default function Header(props) {
  const { cart, url } = props;

  const styles = StyleSheet.create({
    logo: {
      resizeMode: "contain",
      width: "100%"
    }
  });

  return (
    <View
      style={{
        alignItems: "center",
        background: "#f7f7e9",
        flex: 1
      }}
    >
      <Image source={require("./logo.jpg")} style={styles.logo} />
    </View>
  );
}

Header.propTypes = {
  cart: PropTypes.object,
  url: PropTypes.string.isRequired
};
