import React from 'react';
import {FlatList, View} from 'react-native';
import {connect} from 'react-redux';
import {getId} from '../../helpers/utils';
import {
  Categories as CategoriesState,
  CategoryState,
} from '../../interfaces/categories';
import {RootState} from '../../redux';
import Category from '../Category';

type Props = {
  categories: CategoriesState;
  setCategoryProduct: Function;
};

function Categories(props: Props) {
  const {categories, setCategoryProduct} = props;
  const {items} = categories;

  if (items.length === 0) {
    return null;
  }

  return (
    <View
      style={{
        alignItems: 'center',
      }}>
      <FlatList
        data={items}
        keyExtractor={(item: CategoryState) => getId(item).toString()}
        renderItem={({item}) => (
          <Category category={item} setCategoryProduct={setCategoryProduct} />
        )}
      />
    </View>
  );
}

const mapStateToProps = (state: RootState) => ({
  categories: state.categories,
});

export default connect(mapStateToProps)(Categories);
