import React, {useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {
  ActivityIndicator,
  Button,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {connect, useDispatch} from 'react-redux';
import {getId, getProductIcon} from '../../helpers/utils';
import {Cart, CartItem as CartItemState} from '../../interfaces/cart';
import {updateProductInCart} from '../../net/cart';
import {RootState} from '../../redux';

type FormData = {
  quantity: number;
};

type Props = {
  cart: Cart;
  item: CartItemState;
};

function CartItem(props: Props) {
  const {cart, item} = props;
  const {product} = item;
  const name = product.name;

  const [visible, setVisible] = useState(true);
  const dispatch = useDispatch();
  const {control, handleSubmit, errors} = useForm<FormData>();

  const onChange = (args: Array<any>) => {
    const value = args[0].nativeEvent.text;
    setVisible(value === '' ? false : !isNaN(Number(value)));

    return {
      value,
    };
  };

  const onSubmit = handleSubmit(({quantity}) => {
    dispatch(updateProductInCart(getId(product), quantity));
  });

  return cart.isFetching ? (
    <ActivityIndicator size="large" color="blue" />
  ) : (
    <View style={styles.container}>
      <Image source={getProductIcon(name)} testID={`image-${name}`} />
      <View style={{paddingLeft: 24, flexDirection: 'column'}}>
        <Text style={styles.desc} testID={`name-${name}`}>
          {name}
        </Text>
        <Text style={styles.desc}>&euro; {item.total.toFixed(2)}</Text>
        <Text style={{paddingBottom: 8}} testID={`price-${name}`}>
          &euro; {product.price.toFixed(2)}
        </Text>
        <Controller
          as={<TextInput />}
          control={control}
          defaultValue={item.quantity.toString()}
          name="quantity"
          onChange={onChange}
          placeholder="Enter quantity"
          rules={{required: true, maxLength: 3}}
          style={styles.qty}
        />
        {errors.quantity && <Text style={styles.error}>Enter a quantity.</Text>}
        {visible && <Button onPress={onSubmit} title="update" />}
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

const mapStateToProps = (state: RootState) => ({
  cart: state.cart,
});

export default connect(mapStateToProps)(CartItem);
