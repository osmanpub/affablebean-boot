import React from "react";
import PropTypes from "prop-types";
import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
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
      icon = require("../../../assets/img/categories/bakery.jpg");
      break;

    case "cereals":
      icon = require("../../../assets/img/categories/cereals.jpg");
      break;

    case "dairy":
      icon = require("../../../assets/img/categories/dairy.jpg");
      break;

    case "drinks":
      icon = require("../../../assets/img/categories/drinks.jpg");
      break;

    case "fruit & veg":
      icon = require("../../../assets/img/categories/fruitveg.jpg");
      break;

    case "meats":
      icon = require("../../../assets/img/categories/meats.jpg");
      break;

    default:
  }

  function selectCategory() {
    setCategoryProduct(id);
  }

  return (
    <View style={styles.category}>
      <Text>{name}</Text>
      <TouchableWithoutFeedback onPress={selectCategory}>
        <Image source={icon} />
      </TouchableWithoutFeedback>
    </View>
  );
}

Category.propTypes = {
  category: PropTypes.object.isRequired
};
