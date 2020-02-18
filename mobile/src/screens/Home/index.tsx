import React, {useEffect} from 'react';
import {ScrollView} from 'react-native';
import {connect, useDispatch} from 'react-redux';
import Categories from '../../components/Categories';
import Header from '../../components/Header';
import {Cart} from '../../interfaces/cart';
import {fetchCategoriesIfNeeded} from '../../net/categories';
import {RootState} from '../../redux';
import {Categories as CategoriesState} from '../../interfaces/categories';

type Props = {
  cart: Cart;
  categories: CategoriesState;
  setCategoryProduct: Function;
  setScreen: Function;
};

function Home(props: Props) {
  const {cart, categories, setCategoryProduct, setScreen} = props;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategoriesIfNeeded());
  }, []);

  const {items} = categories;

  if (items.length === 0) {
    return null;
  }

  return (
    <ScrollView>
      <Header cart={cart} currentScreen="Home" setScreen={setScreen} />
      <Categories categories={items} setCategoryProduct={setCategoryProduct} />
    </ScrollView>
  );
}

const mapStateToProps = (state: RootState) => ({
  cartegories: state.cart,
  categories: state.categories,
});

export default connect(mapStateToProps)(Home);
