import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import Logo from '../components/Logo';

import LobbyScreen from '../screens/Lobby';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const MainTabNavigator = createStackNavigator(
  {
    Lobby: LobbyScreen,
  },
  {
    initialRouteName: 'Lobby',
    /* The header config from HomeScreen is now here */
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#051622',
        height: 60,
        borderBottomColor: '#DEB992',
        borderWidth: 1,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerTitle: <Logo />,
    },
  },
  config
);

MainTabNavigator.navigationOptions = {
    headerStyle: {
        backgroundColor: '#fff',
    }
}

MainTabNavigator.path = '';

export default MainTabNavigator;
