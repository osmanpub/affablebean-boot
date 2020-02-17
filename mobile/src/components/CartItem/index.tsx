import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, Image, Text, TextInput, View} from 'react-native';
import {updateProductInCart} from '../../net/cart';

export default class CartItem extends Component {
  constructor(props) {
    super(props);
    const {item} = this.props;

    this.state = {
      qty: item.quantity,
    };
  }

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

  onChange = qty => {
    this.setState({qty});
  };

  updateCart = id => {
    let qty = Number(this.state.qty);

    if (isNaN(qty) || qty < 0 || qty > 10) {
      const {item} = this.props;
      this.setState({qty: item.quantity});
    } else {
      const {dispatch} = this.props;
      dispatch(updateProductInCart(id, qty));
    }
  };

  render() {
    const {item} = this.props;
    const {product} = item;
    const name = product.name;

    return (
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          paddingBottom: 24,
          paddingLeft: 32,
        }}>
        <Image source={this.getProductIcon(name)} />
        <View style={{paddingLeft: 24}} />
        <View style={{flexDirection: 'column'}}>
          <Text style={{fontWeight: 'bold'}}>{name}</Text>
          <Text style={{fontWeight: 'bold'}}>
            &euro; {item.total.toFixed(2)}
          </Text>
          <Text style={{paddingBottom: 8}}>
            &euro; {product.price.toFixed(2)}
          </Text>
          <TextInput
            onChangeText={qty => this.onChange(qty)}
            placeholder="Enter quantity"
            style={{
              borderBottomColor: 'black',
              borderBottomWidth: 1,
              marginBottom: 8,
            }}
            value={this.state.qty.toString()}
          />
          <Button onPress={() => this.updateCart(product.id)} title="update" />
        </View>
      </View>
    );
  }
}
