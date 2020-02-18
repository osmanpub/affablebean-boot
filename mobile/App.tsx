import {configureStore} from '@reduxjs/toolkit';
import React, {useEffect, useState} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {Provider} from 'react-redux';
import {id} from './src/interfaces/id';
import rootReducer from './src/redux';
import Cart from './src/screens/Cart';
import CategoryProducts from './src/screens/CategoryProducts';
import Checkout from './src/screens/Checkout';
import Home from './src/screens/Home';

type State = {
  categoryId: id;
  screen: string;
};

const store = configureStore({
  reducer: rootReducer,
});

function App() {
  const [state, setState] = useState<State>({
    categoryId: 0,
    screen: 'Home',
  });

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  const setCategoryProduct = (categoryId: id) => {
    setState({categoryId, screen: 'CategoryProducts'});
  };

  const setScreen = (screen: string) => {
    setState({...state, screen});
  };

  const {categoryId, screen} = state;
  let nextScreen;

  switch (screen) {
    case 'Cart':
      nextScreen = <Cart setScreen={setScreen} />;
      break;

    case 'CategoryProducts':
      nextScreen = <CategoryProducts id={categoryId} setScreen={setScreen} />;
      break;

    case 'Checkout':
      nextScreen = <Checkout setScreen={setScreen} />;
      break;

    default:
      nextScreen = (
        <Home setCategoryProduct={setCategoryProduct} setScreen={setScreen} />
      );
  }

  return <Provider store={store}>{nextScreen}</Provider>;
}

export default App;
