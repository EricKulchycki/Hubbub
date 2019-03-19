import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ScrollView,
  FlatList,
  Image,
} from 'react-native';
import {Header, Icon} from 'react-native-elements';
import {makeRequest} from '../components/Utils'
import * as Colors from '../constants/Colors';
import * as Paths from '../constants/Paths';
import HubFeedItem from '../components/HubFeedItem';

const url = Paths.domain;

export default class ProfileScreen extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      username: '',
      age: -1,
      picture: '',
      user: this.props.navigation.getParam('user', {}),
      loading: false,
      postData: [],
    };
  }

  static navigationOptions = () => ({
    header: null,
  });


  componentDidMount = () => {
    makeRequest('GET', Paths.getPostByUserID + this.state.user.id).then(response => {
      this.setState({postData: response});
    });
    console.log("kekeke");
    console.log(this.state.postData);
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
            Profile
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
            Username:
          </Text>
          <Text>
            {this.state.user.username}
          </Text>

          <Text style = {{paddingTop: 10, fontSize: 22}}>
            Name:
          </Text>
          <Text>
            {this.state.user.firstName + this.state.user.lastName}
          </Text>

          <Text style = {{paddingTop: 10, fontSize: 22}}>
            Age:
          </Text>
          <Text>
            {this.state.user.age}
          </Text>

        </View>

        <TouchableHighlight
          style={{position: 'absolute', alignSelf: 'flex-start', bottom: 0}}
          onPress={() => {
            this.props.navigation.navigate('Home', {user: this.state.user})
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
            this.props.navigation.navigate('Edit', {user: this.state.user});
          }}>
          <Icon
            reverse
            name='edit'
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
    fontSize: 22,
    textAlign: 'center'
  }
});
