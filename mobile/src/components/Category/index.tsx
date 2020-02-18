import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {Category as CategoryState} from '../../interfaces/categories';

type Props = {
  category: CategoryState;
  setCategoryProduct: Function;
};

export default function Category(props: Props) {
  const {category, setCategoryProduct} = props;
  const {id, name} = category;

  return (
    <View style={styles.category}>
      <Text>{name}</Text>
      <TouchableWithoutFeedback onPress={() => setCategoryProduct(id)}>
        <Image source={getCategoryIcon(name)} />
      </TouchableWithoutFeedback>
    </View>
  );
}

const getCategoryIcon = (name: string) => {
  let icon: any = '';

  switch (name) {
    case 'bakery':
      icon = require('../../../assets/img/categories/bakery.jpg');
      break;

    case 'cereals':
      icon = require('../../../assets/img/categories/cereals.jpg');
      break;

    case 'dairy':
      icon = require('../../../assets/img/categories/dairy.jpg');
      break;

    case 'drinks':
      icon = require('../../../assets/img/categories/drinks.jpg');
      break;

    case 'fruit & veg':
      icon = require('../../../assets/img/categories/fruitveg.jpg');
      break;

    case 'meats':
      icon = require('../../../assets/img/categories/meats.jpg');
      break;

    default:
  }

  return icon;
};

const styles = StyleSheet.create({
  category: {
    alignItems: 'center',
    paddingBottom: 24,
  },
});
