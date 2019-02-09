import React from 'react';
import { createStackNavigator } from 'react-navigation';

import SignupScreen from '../screens/SignupScreen';
import LoginScreen from '../screens/LoginScreen';

export default createStackNavigator({
  Login: LoginScreen,
  Signup: SignupScreen,
});
