import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {Button, Image, StyleSheet, Text, TextInput, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {getId, getProductIcon} from '../../helpers/utils';
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
          defaultValue={item.quantity.toString()}
          placeholder="Enter quantity"
          style={styles.qty}
        />
        {errors.quantity && <Text style={styles.error}>Enter a quantity.</Text>}
        <Button onPress={handleSubmit(onSubmit)} title="update" />
      </View>
    </View>
  );
}

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
