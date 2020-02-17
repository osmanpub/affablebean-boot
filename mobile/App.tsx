import {configureStore} from '@reduxjs/toolkit';
import React, {useEffect, useState} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {Provider} from 'react-redux';
import ErrorBoundary from './src/components/ErrorBoundary';
import {ConnectedCart} from './src/containers/Cart';
import {ConnectedCategoryProducts} from './src/containers/CategoryProducts';
import {ConnectedCheckout} from './src/containers/Checkout';
import {ConnectedHome} from './src/containers/Home';
import rootReducer from './src/redux';

type State = {
  categoryId: number;
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

  const setCategoryProduct = (categoryId: number) => {
    setState({categoryId, screen: 'CategoryProducts'});
  };

  const setScreen = (screen: string) => {
    setState({...state, screen});
  };

  let nextScreen;

  switch (state.screen) {
    case 'Cart':
      nextScreen = <ConnectedCart setScreen={setScreen} />;
      break;

    case 'CategoryProducts':
      nextScreen = (
        <ConnectedCategoryProducts
          id={state.categoryId}
          setScreen={setScreen}
        />
      );
      break;

    case 'Checkout':
      nextScreen = <ConnectedCheckout setScreen={setScreen} />;
      break;

    default:
      nextScreen = (
        <ConnectedHome
          setCategoryProduct={setCategoryProduct}
          setScreen={setScreen}
        />
      );
  }

  return (
    <ErrorBoundary>
      <Provider store={store}>{nextScreen}</Provider>
    </ErrorBoundary>
  );
}

export default App;
