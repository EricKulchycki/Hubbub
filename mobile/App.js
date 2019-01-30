import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';

import HomeScreen from "./screens/HomeScreen"
import ProfileScreen from "./screens/ProfileScreen"

const MainNavigator = createMaterialBottomTabNavigator({
  Home: HomeScreen,
  Profile: ProfileScreen
});

export default createAppContainer(MainNavigator);
