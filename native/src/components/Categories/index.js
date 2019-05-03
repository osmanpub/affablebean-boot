import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import Category from "../Category";

export default function Categories(props) {
  if (props == null || props.categories.length === 0) {
    return null;
  }

  const categories = props.categories.map(category => (
    <Category key={category._links.self.href} category={category} />
  ));

  return (
    <View
      style={{
        alignItems: "center",
        flex: 1
      }}
    >
      {categories}
    </View>
  );
}

Categories.propTypes = {
  categories: PropTypes.array.isRequired
};
