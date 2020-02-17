import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {Button, Image, StyleSheet, Text, TextInput, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {getId} from '../../helpers/utils';
import {CartItem as CartItemState} from '../../interfaces/cart';
import {updateProductInCart} from '../../net/cart';

type FormData = {
  quantity: number;
};

type Props = {
  item: CartItemState;
};

export default function CartItem(props: Props) {
  const {item} = props;
  const {product} = item;
  const name = product.name;

  const dispatch = useDispatch();
  const {control, handleSubmit, errors} = useForm<FormData>();

  const onChange = (args: Array<any>) => {
    return {
      value: args[0].nativeEvent.text,
    };
  };

  const onSubmit = handleSubmit(({quantity}) => {
    dispatch(updateProductInCart(getId(product), quantity));
  });

  return (
    <View style={styles.container}>
      <Image source={getProductIcon(name)} />
      <View style={{paddingLeft: 24, flexDirection: 'column'}}>
        <Text style={styles.desc}>{name}</Text>
        <Text style={styles.desc}>&euro; {item.total.toFixed(2)}</Text>
        <Text style={{paddingBottom: 8}}>
          &euro; {product.price.toFixed(2)}
        </Text>
        <Controller
          as={<TextInput />}
          control={control}
          name="quantity"
          onChange={onChange}
          rules={{required: true, min: 0, max: 100}}
          defaultValue={item.quantity}
          placeholder="Enter quantity"
          style={styles.qty}
        />
        {errors.quantity && <Text style={styles.error}>Enter a quantity.</Text>}
        <Button onPress={handleSubmit(onSubmit)} title="update" />
      </View>
    </View>
  );
}

const getProductIcon = (name: string) => {
  let icon: any = '';

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

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: 24,
    paddingLeft: 32,
  },
  desc: {fontWeight: 'bold'},
  error: {
    color: 'red',
    fontWeight: 'bold',
  },
  qty: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginBottom: 8,
  },
});
