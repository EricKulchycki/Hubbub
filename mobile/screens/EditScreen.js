import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ActivityIndicator,
  ScrollView,
  FlatList,
  Image,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import {Header, Icon} from 'react-native-elements';
import * as Colors from '../constants/Colors';
import * as Paths from '../constants/Paths';
import HubFeedItem from '../components/HubFeedItem';

const url = Paths.domain;

export default class EditScreen extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      user: this.props.navigation.getParam('user', {}),
      username: '',
      firstName: '',
      lastName: '',
      age: null,
      picture: '',
      loading: false,
    };
  }

  static navigationOptions = () => ({
    header: null,
  });

  makeRequest(type, resource){
      console.log(type);
      console.log(resource);
      this.setState({loading: true});

      return fetch(url + resource, {
        method: type
      })
      .then((res) => res.json())
      .then((resJson) => {
        return resJson;
      })
      .catch(error => {
        console.log("cannot get " + resource);
      })
  }

  makePost(type, resource){
    this.setState({loading: true});
    const jsonBody = {
      userId: this.state.user.id,
      username: this.state.user.username,
      firstName: this.state.user.firstName,
      lastName: this.state.user.lastName,
      age: this.state.user.age,
      picture: this.state.user.picture
    }
    if(this.state.username != ''){
      jsonBody.username = this.state.username;
    }
    if(this.state.firstName != ''){
      jsonBody.firstName = this.state.firstName;
    }
    if(this.state.lastName != ''){
      jsonBody.lastName = this.state.lastName;
    }
    if(this.state.age != null){
      jsonBody.age = parseInt(this.state.age);
    }
    if(this.state.picture != ''){
      jsonBody.picture = this.state.user.picture;
    }

    console.log("json body");
    console.log(JSON.stringify(jsonBody));
    console.log(url + resource);
    fetch(url + resource, {
      method: type,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        jsonBody
      ),
    });
    this.setState({loading: false});
    this.props.navigation.state.params.onGoBack();
    this.props.navigation.goBack();
  }

  onAgeChanged(text){
    let newAge = '';
    let numbers = '0123456789';

    for (var i = 0; i < text.length; i++) {
      if(numbers.indexOf(text[i]) > -1){
        newAge = newAge + text[i];
      }
      else{
        alert("Please enter numbers only.");
      }
    }

    this.setState({age: newAge});
  }


  render() {
    if(this.state.loading){
      return(
        <View style={{flex: 1, justifyContent: 'center', flexDirection: 'row'}}>
          <ActivityIndicator size='large' color="#d98880"/>
        </View>
      );
    }

    return (
      <View style = {styles.container}>
        <Header backgroundColor = "#a93226"
          centerComponent={
            <Text style = {{fontWeight: 'bold', fontSize: 34, color: "#ccd1d1"}}>
            Edit Profile
            </Text>
          }
        />

        <KeyboardAvoidingView
          style = {styles.container}
          behavior = "padding">
          <View style={{flex: 1, paddingHorizontal: 5}}>
            <Image
              style = {{flexShrink: 150, width: 250, height: 250, alignSelf: 'center',
                borderColor: Colors.MAIN_RED, borderWidth: 5, overflow: 'hidden'}}
              source = {{uri: this.state.user.picture}}
            />

            <Text style = {{paddingTop: 10, fontSize: 22}}>
              First name:
            </Text>
            <TextInput
              style = {{paddingHorizontal: 5, borderColor: '#ccd1d1', borderWidth: 1}}
              onChangeText={(firstName) => this.setState({firstName})}
              value={this.state.firstName}
            />

            <Text style = {{paddingTop: 10, fontSize: 22}}>
              Last name:
            </Text>
            <TextInput
              style = {{paddingHorizontal: 5, borderColor: '#ccd1d1', borderWidth: 1}}
              onChangeText={(lastName) => this.setState({lastName})}
              value={this.state.lastName}
            />

            <Text style = {{paddingTop: 10, fontSize: 22}}>
              Age:
            </Text>
            <TextInput
              style = {{paddingHorizontal: 5, borderColor: '#ccd1d1', borderWidth: 1}}
              onChangeText={(text) => this.onAgeChanged(text)}
              value={this.state.age}
            />
          </View>
        </KeyboardAvoidingView>

        <TouchableHighlight
          style={{position: 'absolute', alignSelf: 'flex-start', bottom: 0}}
          onPress={() => {
            this.props.navigation.goBack();
          }}>
          <Icon
            reverse
            name='remove-circle'
            type='material'
            size={24}
            color='#a93226'/>
        </TouchableHighlight>
        <TouchableHighlight
          style={{position: 'absolute', alignSelf: 'flex-end', bottom: 0}}
          onPress={() => {
            this.makePost('POST', Paths.updateUser);
          }}>
          <Icon
            reverse
            name='save'
            type='material'
            size={24}
            color='#a93226'/>
        </TouchableHighlight>

      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  noPostsText: {
    textAlign: 'center'
  }
});
