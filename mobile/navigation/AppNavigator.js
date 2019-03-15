import React from 'react'
import HomeScreen from '../screens/HomeScreen'
import SignInScreen from '../screens/SignInScreen'
import CreatePostModal from '../screens/CreatePostModal'
import AuthLoadingScreen from '../screens/AuthLoadingScreen'
import ProfileScreen from '../screens/ProfileScreen'
import EditScreen from '../screens/EditScreen'
import { createAppContainer, createStackNavigator, createSwitchNavigator } from 'react-navigation';

const AppStack = createStackNavigator({Home: HomeScreen, Profile: ProfileScreen, Edit: EditScreen});
export default createAppContainer(createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  AuthLoading: AuthLoadingScreen,
  Auth: SignInScreen,
  App: AppStack,

},
{
  initialRouteName: 'AuthLoading',
}
));
