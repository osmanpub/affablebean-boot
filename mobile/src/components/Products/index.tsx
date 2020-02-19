import React from 'react';
import {
  ActivityIndicator,
  Button,
  FlatList,
  Image,
  Text,
  View,
} from 'react-native';
import {connect, useDispatch} from 'react-redux';
import {getId, getProductIcon} from '../../helpers/utils';
import {Cart} from '../../interfaces/cart';
import {
  Category,
  CategoryState,
  ProductState,
} from '../../interfaces/categories';
import {id} from '../../interfaces/id';
import {addProductToCart, updateProductInCart} from '../../net/cart';
import {RootState} from '../../redux';
import {clearPurchase} from '../../redux/purchase';

type Props = {
  cart: Cart;
  categories: Array<CategoryState>;
  category: Category;
  clearPurchase: Function;
  products: Array<ProductState>;
};

function Products(props: Props) {
  const {cart, categories, clearPurchase, products} = props;
  const dispatch = useDispatch();

  const addToCart = (id: id) => {
    const update = cart.items.filter(item => getId(item.product) === id);

    clearPurchase();
    dispatch(
      update.length > 0
        ? updateProductInCart(id, update[0].quantity + 1)
        : addProductToCart(id.toString()),
    );
  };

  if (categories.length === 0) {
    return null;
  }

  return cart.isFetching ? (
    <ActivityIndicator size="large" color="blue" />
  ) : (
    <View
      style={{
        alignItems: 'center',
      }}>
      <FlatList
        data={products}
        keyExtractor={item => getId(item).toString()}
        renderItem={({item}) => {
          return (
            <View
              style={{
                alignItems: 'center',
                flexDirection: 'row',
                paddingBottom: 24,
              }}>
              <Image source={getProductIcon(item.name)} />
              <View style={{paddingLeft: 24}} />
              <View style={{alignItems: 'flex-start'}}>
                <Text style={{fontWeight: 'bold'}}>{item.name}</Text>
                <Text style={{paddingBottom: 8}}>
                  &euro; {item.price.toFixed(2)}
                </Text>
                <Button onPress={() => addToCart(getId(item))} title="add" />
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}

const mapStateToProps = (state: RootState) => ({
  cart: state.cart,
});

const mapDispatchToProps = {
  clearPurchase,
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);
