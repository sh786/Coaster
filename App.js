import { Asset } from 'expo-asset';
import * as Font from 'expo-font';

import React, { useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { Provider } from 'react-redux';
import rootReducer from './redux/reducers';
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';

import { Ionicons } from '@expo/vector-icons';
// AWS
import API from '@aws-amplify/api';
import Amplify from 'aws-amplify';
import PubSub from '@aws-amplify/pubsub';
import AppNavigator from './navigation/AppNavigator';

import config from './aws-exports';
Amplify.configure(config);

API.configure(config); // Configure Amplify
PubSub.configure(config);

const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware, // lets us dispatch() functions
  ),
);

function App() {
  async function loadResourcesAsync() {
    await Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png'),
        require('./assets/poodlesPics.jpg'),
        require('./assets/bar_stock.jpg'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free to
        // remove this if you are not using it in your app
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
        'san-francisco': require('./assets/fonts/SF-UI-Display-Regular.otf'),
        'new-york': require('./assets/fonts/NewYorkMedium-Regular.otf'),
        'new-york-bold': require('./assets/fonts/NewYorkMedium-Bold.otf'),
        'new-york-semibold': require('./assets/fonts/NewYorkMedium-Semibold.otf'),
      }),
    ]);
    setIsLoaded(true);
  }

  const [isLoaded, setIsLoaded] = useState(false);
  loadResourcesAsync();

  return isLoaded ? (
    <Provider store={store}>
        <AppNavigator />
    </Provider>
  ) : (
    <ActivityIndicator />
  );
}

export default App;