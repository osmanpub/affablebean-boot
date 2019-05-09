import React from "react";
import { FlatList, View } from "react-native";
import PropTypes from "prop-types";
import Category from "../Category";

export default function Categories(props) {
  if (props == null || props.categories.length === 0) {
    return null;
  }

  return (
    <View
      style={{
        alignItems: "center"
      }}
    >
      <FlatList
        data={props.categories}
        keyExtractor={(item, index) => item._links.self.href}
        renderItem={({ item }) => (
          <Category
            category={item}
            setCategoryProduct={props.setCategoryProduct}
          />
        )}
      />
    </View>
  );
}

Categories.propTypes = {
  categories: PropTypes.array.isRequired
};
