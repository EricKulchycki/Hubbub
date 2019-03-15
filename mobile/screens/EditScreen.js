import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ScrollView,
  FlatList,
  Image,
  TextInput,
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
      firstname: '',
      lastname: '',
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
    }
    if(this.state.username != this.state.user.username){
      jsonBody.push({
        username: this.state.username
      })
    }
    if(this.state.age != this.state.user.age){
      jsonBody.push({
        age: this.state.age
      })
    }
    if(picture != ''){
      jsonBody.push({
        picture: this.state.picture
      })
    }

    console.log("json body");
    console.log(jsonBody);
    fetch(url + resource, {
      method: type,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jsonBody
      }),
    });
    this.setState({loading: false});
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

        <Image
          style = {{width: 250, height: 250, alignSelf: 'center',
            borderColor: Colors.MAIN_RED, borderWidth: 5, overflow: 'hidden'}}
          source = {{uri: this.state.user.picture}}
        />

        <View style={{paddingHorizontal: 5}}>
          <Text style = {{paddingTop: 10, fontSize: 22}}>
            First name:
          </Text>
          <TextInput
            style = {{paddingHorizontal: 5, borderColor: '#ccd1d1', borderWidth: 1}}
            onChangeText={(firstname) => this.setState({firstname})}
            value={this.state.firstname}
          />

          <Text style = {{paddingTop: 10, fontSize: 22}}>
            Last name:
          </Text>
          <TextInput
            style = {{paddingHorizontal: 5, borderColor: '#ccd1d1', borderWidth: 1}}
            onChangeText={(lastname) => this.setState({lastname})}
            value={this.state.lastname}
          />

          <Text style = {{paddingTop: 10, fontSize: 22}}>
            Age:
          </Text>
          <TextInput
            style = {{paddingHorizontal: 5, borderColor: '#ccd1d1', borderWidth: 1}}
            onChangeText={(age) => this.setState({age})}
            value={this.state.age}
          />
        </View>

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
            alert("Save Profile");//this.makePost('POST', Paths.updateUser)
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
