import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';

import Colors from '../constants/Colors';
import HeaderTitle from '../components/Header/HeaderTitle';
import SignInScreen from '../components/Auth/SignIn';
import SignUpScreen from '../components/Auth/SignUp';
import ForgotPasswordScreen from '../components/Auth/ForgotPassword';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const AuthNavigator = createStackNavigator(
  {
    SignIn: SignInScreen,
    SignUp: SignUpScreen,
    ForgotPassword: ForgotPasswordScreen,
  },
  {
    initialRouteName: 'SignIn',
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
      headerTitle: <HeaderTitle title='coaster' navigation={this} />,
    },
  },
  config,
);

AuthNavigator.navigationOptions = {
  headerStyle: {
    backgroundColor: '#fff',
  },
};

AuthNavigator.path = '';

export default AuthNavigator;
