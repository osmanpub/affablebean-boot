import React, { Component } from "react";
import PropTypes from "prop-types";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { addProductToCart } from "../../net/cart";
import { clearPurchase } from "../../actions";

export default class Products extends Component {
  addToCart = id => {
    const { dispatch } = this.props;
    dispatch(clearPurchase());
    dispatch(addProductToCart(id));
  };

  getProductIcon = name => {
    var icon = "";

    switch (name) {
      case "chocolate cookies":
        icon = require("./products/chocolate-cookies.png");
        break;

      case "pumpkin seed bun":
        icon = require("./products/pumpkin-seed-bun.png");
        break;

      case "sesame seed bagel":
        icon = require("./products/sesame-seed-bagel.png");
        break;

      case "sunflower seed loaf":
        icon = require("./products/sunflower-seed-loaf.png");
        break;

      default:
    }

    return icon;
  };

  render() {
    const { categories } = this.props;

    if (categories.length === 0) {
      return null;
    }

    const styles = StyleSheet.create({
      productImage: {
        padding: 1
      }
    });

    return (
      <View
        style={{
          alignItems: "center",
          flex: 1
        }}
      >
        <FlatList
          data={this.props.products._embedded.productList}
          keyExtractor={(item, index) => item._links.self.href}
          renderItem={({ item }) => {
            return (
              <View>
                <Text>{item.name}</Text>
                <Image
                  source={this.getProductIcon(item.name)}
                  style={styles.productImage}
                />
                <Text />
                <Text />
                <Text />
                <Text />
                <Text />
                <Text />
              </View>
            );
          }}
        />
      </View>
    );
  }
}

Products.propTypes = {
  category: PropTypes.object.isRequired,
  categories: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired
};
