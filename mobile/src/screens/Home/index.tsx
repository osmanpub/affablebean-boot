import React, {useEffect} from 'react';
import {SafeAreaView} from 'react-native';
import {connect, useDispatch} from 'react-redux';
import Categories from '../../components/Categories';
import Header from '../../components/Header';
import {Categories as CategoriesState} from '../../interfaces/categories';
import {fetchCategoriesIfNeeded} from '../../net/categories';
import {RootState} from '../../redux';

type Props = {
  categories: CategoriesState;
  setCategoryProduct: Function;
  setScreen: Function;
};

function Home(props: Props) {
  const {categories, setCategoryProduct, setScreen} = props;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategoriesIfNeeded());
  }, []);

  const {items} = categories;

  if (items.length === 0) {
    return null;
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header currentScreen="Home" setScreen={setScreen} />
      <Categories setCategoryProduct={setCategoryProduct} />
    </SafeAreaView>
  );
}

const mapStateToProps = (state: RootState) => ({
  categories: state.categories,
});

export default connect(mapStateToProps)(Home);
