import React from 'react'
import { StyleSheet, Text, View, Image, Button, Platform } from "react-native"
import * as Constants from 'expo-constants';
import {WebBrowser, Linking} from 'expo';
import GoogleSignInButton from "../components/GoogleSignInButton";
import io from 'socket.io-client';


export default class SignInScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      user: {},
    }
    socket = io('http://142.93.147.148:4000');
  }


  static navigationOptions = () => ({
    header: null,
  });

  componentDidMount() {
    socket.on('google', response => {
      console.log("user object retrieved form server."); 
        if(logInVisible){
          this.setState({
            user: response,
          });
          WebBrowser.dismissBrowser();
          this.props.navigation.navigate('App', {user: this.state.user});
        }
    });
  }

signIn = async() =>{
  url = 'http://142.93.147.148:4000/google?socketId=${socket.id}';
  redirectUrl = Linking.makeUrl();
  WebBrowser.openAuthSessionAsync(url, redirectUrl);
}

 render() {
   return (
     <View style = {styles.container}>
        <Image
          style = {styles.icon}
          source = {require('../assets/images/alpha-h-box/drawable-hdpi/ic_alpha_h_box_grey600_48dp.png')}
        />
      <GoogleSignInButton  onPress ={this.signIn}>
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
