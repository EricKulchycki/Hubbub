import React from 'react'
import { StyleSheet, AsyncStorage, Text, View, Image, Button, Platform } from "react-native"
import {Icon} from 'react-native-elements';
import * as Constants from 'expo-constants';
import {AuthSession} from 'expo';
import GoogleSignInButton from "../components/GoogleSignInButton";
import io from 'socket.io-client';
import * as Paths from '../constants/Paths';
import * as Colors from '../constants/Colors';


export default class SignInScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      user: {},
    }
    socket = io(Paths.SERVER);
  }


  storeData = async (data) => {
    try{
      await AsyncStorage.setItem('USER', data);
    } catch(error){
      console.log(error);
    }
  }

  static navigationOptions = () => ({
    header: null,
  });
  componentDidMount = () => {
    socket.on('google', response => {
      console.log("user object retrieved form server.");
          this.setState({
            user: response,
          });
          AuthSession.dismiss();
          this.storeData(JSON.stringify(this.state.user));

          this.props.navigation.navigate('Home', {user: this.state.user});
    });
  }

signIn = async() =>{
  let url = (Paths.SERVER + Paths.AUTH + socket.id);
  let result = await AuthSession.startAsync({
    authUrl: url
  });

}

 render() {
   return (
     <View style = {styles.container}>
       <Image
         style = {styles.icon}
         source = {require('../assets/images/logo_t_512.png')}
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
    backgroundColor: Colors.MAIN_RED
  },
  icon: {
    height: 256,
    width: 256
  }
});
