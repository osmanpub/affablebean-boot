import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, FlatList, Image, Text, View} from 'react-native';
import {addProductToCart, updateProductInCart} from '../../net/cart';
import {clearPurchase} from '../../actions';

export default class Products extends Component {
  addToCart = id => {
    const {cart, dispatch} = this.props;
    const update = cart.items.filter(item => item.product.id === id);

    dispatch(clearPurchase());
    dispatch(
      update.length > 0
        ? updateProductInCart(id, update[0].quantity + 1)
        : addProductToCart(id),
    );
  };

  getProductIcon = name => {
    var icon = '';

    switch (name) {
      case 'broccoli':
        icon = require('../../../assets/img/products/broccoli.png');
        break;

      case 'butter':
        icon = require('../../../assets/img/products/butter.png');
        break;

      case 'cheese':
        icon = require('../../../assets/img/products/cheese.png');
        break;

      case 'chicken leg':
        icon = require('../../../assets/img/products/chicken-leg.png');
        break;

      case 'chocolate cookies':
        icon = require('../../../assets/img/products/chocolate-cookies.png');
        break;

      case 'corn on the cob':
        icon = require('../../../assets/img/products/corn-on-the-cob.png');
        break;

      case 'free range eggs':
        icon = require('../../../assets/img/products/free-range-eggs.png');
        break;

      case 'granola':
        icon = require('../../../assets/img/products/granola.png');
        break;

      case 'green tea':
        icon = require('../../../assets/img/products/green-tea.png');
        break;

      case 'herbal tea':
        icon = require('../../../assets/img/products/herbal-tea.png');
        break;

      case 'jumbo oats':
        icon = require('../../../assets/img/products/jumbo-oats.png');
        break;

      case 'milk':
        icon = require('../../../assets/img/products/milk.png');
        break;

      case 'organic meat patties':
        icon = require('../../../assets/img/products/organic-meat-patties.png');
        break;

      case 'organic coffee':
        icon = require('../../../assets/img/products/organic-coffee.png');
        break;

      case 'parma ham':
        icon = require('../../../assets/img/products/parma-ham.png');
        break;

      case 'porridge oats':
        icon = require('../../../assets/img/products/porridge-oats.png');
        break;

      case 'pumpkin seed bun':
        icon = require('../../../assets/img/products/pumpkin-seed-bun.png');
        break;

      case 'red currants':
        icon = require('../../../assets/img/products/red-currants.png');
        break;

      case 'rice flakes':
        icon = require('../../../assets/img/products/rice-flakes.png');
        break;

      case 'sausages':
        icon = require('../../../assets/img/products/sausages.png');
        break;

      case 'seedless watermelon':
        icon = require('../../../assets/img/products/seedless-watermelon.png');
        break;

      case 'sesame seed bagel':
        icon = require('../../../assets/img/products/sesame-seed-bagel.png');
        break;

      case 'sunflower seed loaf':
        icon = require('../../../assets/img/products/sunflower-seed-loaf.png');
        break;

      case 'wholebean coffee':
        icon = require('../../../assets/img/products/wholebean-coffee.png');
        break;

      default:
    }

    return icon;
  };

  render() {
    const {categories} = this.props;

    if (categories.length === 0) {
      return null;
    }

    return (
      <View
        style={{
          alignItems: 'center',
        }}>
        <FlatList
          data={this.props.products._embedded.productList}
          keyExtractor={(item, index) => item.id}
          renderItem={({item}) => {
            return (
              <View
                style={{
                  alignItems: 'center',
                  flexDirection: 'row',
                  paddingBottom: 24,
                }}>
                <Image source={this.getProductIcon(item.name)} />
                <View style={{paddingLeft: 24}} />
                <View style={{alignItems: 'flex-start'}}>
                  <Text style={{fontWeight: 'bold'}}>{item.name}</Text>
                  <Text style={{paddingBottom: 8}}>
                    &euro; {item.price.toFixed(2)}
                  </Text>
                  <Button onPress={() => this.addToCart(item.id)} title="add" />
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
  dispatch: PropTypes.func.isRequired,
};
