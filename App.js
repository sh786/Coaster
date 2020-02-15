import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';

import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';
import { Provider } from 'react-redux';
import rootReducer from './redux/reducers';
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';

import { Ionicons } from '@expo/vector-icons';
// AWS
import Amplify from 'aws-amplify';
import API from '@aws-amplify/api';
import AppNavigator from './navigation/AppNavigator';

import config from './aws-exports';
Amplify.configure(config);
API.configure(config);

const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware, // lets us dispatch() functions
  ),
);

export default function App() {
  loadResourcesAsync();

  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );

  // if (!isLoadingComplete && !props.skipLoadingScreen) {
  //   return (
  //     <AppLoading
  //       startAsync={loadResourcesAsync}
  //       onError={handleLoadingError}
  //       onFinish={() => handleFinishLoading(setLoadingComplete)}
  //     />
  //   );
  // } else {
  //   return (
  //     <View style={styles.container}>
  //       {Platform.OS === 'ios' && <StatusBar barStyle='default' />}
  //       <AppNavigator />
  //     </View>
  //   );
  // }
}

async function loadResourcesAsync() {
  await Promise.all([
    Asset.loadAsync([
      require('./assets/images/robot-dev.png'),
      require('./assets/images/robot-prod.png'),
      require('./assets/images/drunk_leprechaun.png'),
      require('./assets/images/poodlesPics.jpg'),
    ]),
    Font.loadAsync({
      // This is the font that we are using for our tab bar
      ...Ionicons.font,
      // We include SpaceMono because we use it in HomeScreen.js. Feel free to
      // remove this if you are not using it in your app
      'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      'san-francisco': require('./assets/fonts/SF-UI-Display-Regular.otf'),
    }),
  ]);
}

function handleLoadingError(error) {
  // In this case, you might want to report the error to your error reporting
  // service, for example Sentry
  console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true);
}
