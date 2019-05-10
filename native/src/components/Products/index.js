import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, FlatList, Image, Text, View } from "react-native";
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
      case "broccoli":
        icon = require("./products/broccoli.png");
        break;

      case "butter":
        icon = require("./products/butter.png");
        break;

      case "cheese":
        icon = require("./products/cheese.png");
        break;

      case "chicken leg":
        icon = require("./products/chicken-leg.png");
        break;

      case "chocolate cookies":
        icon = require("./products/chocolate-cookies.png");
        break;

      case "corn on the cob":
        icon = require("./products/corn-on-the-cob.png");
        break;

      case "free range eggs":
        icon = require("./products/free-range-eggs.png");
        break;

      case "granola":
        icon = require("./products/granola.png");
        break;

      case "green tea":
        icon = require("./products/green-tea.png");
        break;

      case "herbal tea":
        icon = require("./products/herbal-tea.png");
        break;

      case "jumbo oats":
        icon = require("./products/jumbo-oats.png");
        break;

      case "milk":
        icon = require("./products/milk.png");
        break;

      case "organic meat patties":
        icon = require("./products/organic-meat-patties.png");
        break;

      case "organic coffee":
        icon = require("./products/organic-coffee.png");
        break;

      case "parma ham":
        icon = require("./products/parma-ham.png");
        break;

      case "porridge oats":
        icon = require("./products/porridge-oats.png");
        break;

      case "pumpkin seed bun":
        icon = require("./products/pumpkin-seed-bun.png");
        break;

      case "red currants":
        icon = require("./products/red-currants.png");
        break;

      case "rice flakes":
        icon = require("./products/rice-flakes.png");
        break;

      case "sausages":
        icon = require("./products/sausages.png");
        break;

      case "seedless watermelon":
        icon = require("./products/seedless-watermelon.png");
        break;

      case "sesame seed bagel":
        icon = require("./products/sesame-seed-bagel.png");
        break;

      case "sunflower seed loaf":
        icon = require("./products/sunflower-seed-loaf.png");
        break;

      case "wholebean coffee":
        icon = require("./products/wholebean-coffee.png");
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

    return (
      <View
        style={{
          alignItems: "center"
        }}
      >
        <FlatList
          data={this.props.products._embedded.productList}
          keyExtractor={(item, index) => item._links.self.href}
          renderItem={({ item }) => {
            return (
              <View>
                <View
                  style={{
                    alignItems: "center",
                    flexDirection: "row",
                    paddingBottom: 24
                  }}
                >
                  <Image source={this.getProductIcon(item.name)} />
                  <View style={{ paddingLeft: 24 }} />
                  <View style={{ alignItems: "flex-start" }}>
                    <Text>{item.name}</Text>
                    <Text style={{ paddingBottom: 8 }}>
                      &euro; {item.price.toFixed(2)}
                    </Text>
                    <Button
                      onPress={() => this.addToCart(item.id)}
                      title="add"
                    />
                  </View>
                </View>
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