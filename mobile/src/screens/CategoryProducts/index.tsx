import React, {useEffect} from 'react';
import {ActivityIndicator} from 'react-native';
import {connect, useDispatch} from 'react-redux';
import Header from '../../components/Header';
import Products from '../../components/Products';
import {CategoryProducts as CategoryProductsState} from '../../interfaces/categories';
import {id} from '../../interfaces/id';
import {fetchCategoryIfNeeded} from '../../net/category';
import {RootState} from '../../redux';

type Props = {
  category: CategoryProductsState;
  id: id;
  setScreen: Function;
};

function CategoryProducts(props: Props) {
  const {category, id, setScreen} = props;
  const {isFetching} = category;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategoryIfNeeded(id));
  }, [dispatch, id]);

  return (
    <>
      <Header currentScreen="CategoryProducts" setScreen={setScreen} />
      {isFetching ? (
        <ActivityIndicator size="large" color="blue" />
      ) : (
        <Products
          categories={category.categories}
          category={category.category}
          products={category.products}
        />
      )}
    </>
  );
}

const mapStateToProps = (state: RootState) => {
  const {category} = state;

  return {
    category,
  };
};

export default connect(mapStateToProps)(CategoryProducts);
