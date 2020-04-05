import React from 'react';
import { Platform, Text } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';

import VenueLobby from '../components/Lobby/VenueLobby';
import VenueScreen from '../components/VenueScreen/VenueScreen';
import EventScreen from '../components/EventScreen/EventScreen';
import PaymentScreen from '../components/Payment';
import CheckoutSuccessScreen from '../components/Payment/CheckoutSuccessScreen';
import Colors from '../constants/Colors';
import HeaderTitle from '../components/Header/HeaderTitle';
import Logo from '../components/Common/Logo';
import AccountScreen from '../components/Account';
import MyTixScreen from '../components/Account/MyTix';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const MainTabNavigator = createStackNavigator(
  {
    Lobby: VenueLobby,
    Venue: VenueScreen,
    Event: EventScreen,
    Payment: PaymentScreen,
    CheckoutSuccess: CheckoutSuccessScreen,
    Account: AccountScreen,
    MyTix: MyTixScreen,
  },
  {
    initialRouteName: 'Lobby',
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

MainTabNavigator.navigationOptions = ({
  headerStyle: {
    backgroundColor: '#fff',
  },
});

MainTabNavigator.path = '';

export default MainTabNavigator;
