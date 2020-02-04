import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';

import VenueLobby from '../components/Lobby';
import VenueScreen from '../components/VenueScreen';
import EventScreen from '../components/EventScreen';
import Colors from '../constants/Colors';
import Logo from '../components/Common/Logo';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const MainTabNavigator = createStackNavigator(
  {
    Lobby: VenueLobby,
    Venue: VenueScreen,
    Event: EventScreen,
  },
  {
    initialRouteName: 'Lobby',
    /* The header config from HomeScreen is now here */
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Colors.headerColor,
        height: 60,
        borderBottomColor: Colors.accentColor,
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
