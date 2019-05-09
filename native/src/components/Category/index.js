import React from "react";
import PropTypes from "prop-types";
import {
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from "react-native";

export default function Category(props) {
  const { category, setCategoryProduct } = props;
  const { id, name } = category;

  const styles = StyleSheet.create({
    category: {
      alignItems: "center",
      paddingBottom: 24
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

  function selectCategory() {
    setCategoryProduct(id);
  }

  return (
    <View style={styles.category}>
      <Text>{name}</Text>
      <TouchableHighlight onPress={selectCategory}>
        <Image source={icon} />
      </TouchableHighlight>
    </View>
  );
}

Category.propTypes = {
  category: PropTypes.object.isRequired
};
