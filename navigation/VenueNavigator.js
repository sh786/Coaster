import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';

import Colors from '../constants/Colors';
import HeaderTitle from '../components/Header/HeaderTitle';
import VenuePortalScreen from '../components/VenuePortal';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const VenueNavigator = createStackNavigator(
  {
    VenuePortal: VenuePortalScreen,
  },
  {
    initialRouteName: 'VenuePortal',
    /* The header config from HomeScreen is now here */
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Colors.primaryColor,
        height: 60,
        borderBottomColor: Colors.accentColor,
        borderWidth: 1,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerTitle: <HeaderTitle title='coaster' />,
    },
  },
  config,
);

VenueNavigator.navigationOptions = {
  headerStyle: {
    backgroundColor: '#fff',
  },
};

VenueNavigator.path = '';

export default VenueNavigator;
