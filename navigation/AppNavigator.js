import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import AuthNavigator from './AuthNavigator';
import AuthLoadingScreen from '../components/Auth/AuthLoadingScreen';

export default createAppContainer(
  createSwitchNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    // AuthLoadingScreen, // need logic for user to show loading indicator
    Auth: AuthNavigator,
    Main: MainTabNavigator,
  })
);
