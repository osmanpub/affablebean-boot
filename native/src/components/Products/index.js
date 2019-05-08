import React, { Component } from "react";
import PropTypes from "prop-types";
import { FlatList, View } from "react-native";
import { addProductToCart } from "../../net/cart";
import { clearPurchase } from "../../actions";

export class Products extends Component {
  addToCart = id => {
    const { dispatch } = this.props;
    dispatch(clearPurchase());
    dispatch(addProductToCart(id));
  };

  render() {
    const { categories } = this.props;

    if (categories.length === 0) {
      return null;
    }

    console.log(this.props.products._embedded.productList);

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
          renderItem={({ item }) => <Text>{item.name}</Text>}
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
