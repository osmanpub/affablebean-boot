import React from "react";
import PropTypes from "prop-types";
import { Image, StyleSheet, Text, View } from "react-native";

export default function Category(props) {
  const { category } = props;
  const { name } = category;

  const styles = StyleSheet.create({
    categoryImage: {
      padding: 1
    }
  });

  var icon = "";

  switch (name) {
    case "bakery":
      icon = require("./categories/bakery.jpg");
      break;

    case "cereals":
      icon = require("./categories/cereals.jpg");
      break;

    case "dairy":
      icon = require("./categories/dairy.jpg");
      break;

    case "drinks":
      icon = require("./categories/drinks.jpg");
      break;

    case "fruit & veg":
      icon = require("./categories/fruitveg.jpg");
      break;

    case "meats":
      icon = require("./categories/meats.jpg");
      break;

    default:
  }

  return (
    <View>
      <Text>{name}</Text>
      <View style={{ flex: 0.04 }} />
      <Image source={icon} style={styles.categoryImage} />
    </View>
  );
}

Category.propTypes = {
  category: PropTypes.object.isRequired
};
