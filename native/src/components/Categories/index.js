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
        alignItems: "center",
        flex: 1
      }}
    >
      <FlatList
        data={props.categories}
        keyExtractor={(item, index) => item._links.self.href}
        renderItem={({ item }) => <Category category={item} />}
      />
    </View>
  );
}

Categories.propTypes = {
  categories: PropTypes.array.isRequired
};
