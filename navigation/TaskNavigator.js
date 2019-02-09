import React from 'react';
import { createStackNavigator } from 'react-navigation';

import TaskScreen from '../screens/TaskScreen';

export default createStackNavigator({
  Task: TaskScreen,
});
