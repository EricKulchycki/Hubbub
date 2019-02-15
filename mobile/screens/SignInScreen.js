import React from 'react'
import { StyleSheet, Text, View, Image, Button, Platform } from "react-native"
import * as Constants from 'expo-constants';
import {Google} from 'expo'
import GoogleSignInButton from "../components/GoogleSignInButton";



signIn = async () => {
  try {
    const result = await Google.logInAsync({
      androidClientId: "95848856284-t9lde7p79l0i22dcp3oc47rr47566gc7.apps.googleusercontent.com",
      iosClientId: "95848856284-mo1fa9cfmojhjionnbq548sm3eoqfubo.apps.googleusercontent.com",
      webClientId: "95848856284-c286cmuj00kroedj58ufbpnddqm5g6b9.apps.googleusercontent.com",
      scopes: ['profile', 'email']
    });

    if (result.type === "success") {
      this.setState({
            user: user
      });
      this.props.navigation.navigate('Home', {user: this.user});
    }
    else{
      console.log("cancelled");
    }
  }
  catch(e){
    console.log("error", e);
  }
}


export default class SignInScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {user: null};
  }
  static navigationOptions = () => ({
    header: null,
  });

 render() {
   return (
     <View style = {styles.container}>
        <Image
          style = {styles.icon}
          source = {require('../assets/images/alpha-h-box/drawable-hdpi/ic_alpha_h_box_grey600_48dp.png')}
        />
        <GoogleSignInButton  onPress ={() => this.props.navigation.navigate('App', {user: this.state.user})}>
            Sign In With Google!
        </GoogleSignInButton>
     </View>
   )
 }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#a93226'
  },
  icon: {
    height: 200,
    width: 200
  }
});
