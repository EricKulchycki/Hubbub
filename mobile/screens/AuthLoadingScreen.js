import React from 'react';
import * as Constants from 'expo-constants';
import { ActivityIndicator, AsyncStorage, StatusBar, StyleSheet, Text, View, Image, Button, Platform } from "react-native"

export default class AuthLoadingScreen extends React.Component{
  state = {
    user: {}
  };

  _retrieveData = async() => {
    try{
      const value = await AsyncStorage.getItem('USER');
      if (value != null){
        console.log('User found in storage');
        this.setState({user: JSON.parse(value)});
        this.props.navigation.navigate('App', {user: this.state.user});
      }
      else {
        console.log('No User Stored, going to log in screen.');
        this.props.navigation.navigate('Auth');
      }
    } catch(error){
      console.log(error);
    }
  }

  componentDidMount(){
    this._retrieveData();
  }
  // Render any loading content that you like here
  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}
