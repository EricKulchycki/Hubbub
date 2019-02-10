import React from 'react';
import * as Constants from 'expo-constants';
import {GoogleSignIn} from 'expo-google-sign-in';
import { ActivityIndicator, StatusBar, StyleSheet, Text, View, Image, Button, Platform } from "react-native";

const isInClient = Constants.appOwnership === 'expo';

if (isInClient){
  GoogleSignIn.allowInClient();
}

const clientIdForUseInExpoClient = "95848856284-4bdqo0t8ru9ifgckfqgqqd130941v9pp.apps.googleusercontent.com";

const clientIdForUseInStandalone = Platform.select({
  android:"95848856284-62c7270741hi5dvc9c5tbe6rr90nag2v.apps.googleusercontent.com",
  ios: "95848856284-qqj4vdh1midmpp8r3ae9ibrl410d4e9v.apps.googleusercontent.com"
});

const clientID = isInClient ? clientIdForUseInExpoClient: clientIdForUseInStandalone;

export default class AuthLoadingScreen extends React.Component {
  state = {user: null};

  async componentDidMount(){
    try{
      await GoogleSignIn.initAsync({
        clientId,
      });
      const data = await GoogleSignIn.signInSilentlyAsync();
      console.log({data});

      if (data) {
        const photoURL = await GoogleSignIn.getPhotoAsync(256);
        const user = await GoogleSignIn.getCurrentUserAsync();
        this.setState({
          user: {
              ...user.toJSON(),
              photoURL: photoURL || user.photoURL,
          }
        });

        this.props.navigation.navigate('App', {user: this.user});
      }
      else{
        console.log("cancelled");
        this.props.navigation.navigate('Auth');
      }
    }
    catch(e){
      console.log("error", e);
    }
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
