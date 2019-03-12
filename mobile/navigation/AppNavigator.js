import React from 'react'
import HomeScreen from '../screens/HomeScreen'
import SignInScreen from '../screens/SignInScreen'
import CreatePostModal from '../screens/CreatePostModal'
import AuthLoadingScreen from '../screens/AuthLoadingScreen'
import { createAppContainer, createStackNavigator, createSwitchNavigator } from 'react-navigation';

const AppStack = createStackNavigator({Home: HomeScreen});
const AuthStack = createStackNavigator({SignIn: SignInScreen}, {headerMode: 'screen'});
export default createAppContainer(createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  AuthLoading: AuthLoadingScreen,
  App: AppStack,
  Auth: AuthStack
},
{
  initialRouteName: 'AuthLoading',
}
));
