import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ScrollView,
  FlatList,
} from 'react-native';
import {Header, Icon} from 'react-native-elements';
import * as Colors from '../constants/Colors';
import * as Paths from '../constants/Paths';

const url = Paths.SERVER;

export default class ProfileScreen extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      user: this.props.navigation.getParam('user', {}),
      username: '',
      age: -1,
      picture: '',
      loading: false,
      postData: [],
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
    if(this.state.username != ''){
      jsonBody.push({
        username: this.state.username
      })
    }
    if(age != -1){
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


  componentDidMount = () => {
    console.log("kekeke");
    console.log(this.state.user);
    this.makeRequest('GET', Paths.getFriendsPosts + this.state.user.id).then(response => {
      this.setState({postData: response});
    });
    this.setState({loading: false});
  }

  render() {
    if(this.state.postData.length != 0){
      console.log("Got posts from myself");
      timeline = <FlatList
        data = {this.state.postData}
        renderItem={({item}) => (
          <HubFeedItem
            name = {item.user.username}
            title = {item.title}
            rating = {item.rating}
            body = {item.body}
          />
        )}
        ItemSeparatorComponent = {this.renderSeparator}
        keyExtractor={item => item.id.toString()}
      />;
    }
    else{
      console.log("I have no posts");
      timeline = <Text style = {styles.noPostsText}>It seems you have no posts!</Text>;
    }

    if(this.state.loading){
      return(
        <View style={{flex: 1, justifyContent: 'center', flexDirection: 'row'}}>
          <ActivityIndicator size='large' color="#d98880"/>
        </View>
      );
    }

    const {navigation} = this.props;
    var message = "";
    var creating = navigation.getParam('creating');
    if(creating){
      message = "Create Profile";
    }
    else{
      message = "Edit Profile";
    }



    return (
      <View style = {styles.container}>
        <Header backgroundColor = "#a93226"
          centerComponent={
            <Text style = {{fontWeight: 'bold', fontSize: 34, color: "#ccd1d1"}}>
            {message}
            </Text>
          }
        />

        {timeline}

        <FlatList
          data = {this.state.postData}
          renderItem={({item}) => (
            <HubFeedItem
              name = {item.user.username}
              title = {item.title}
              rating = {item.rating}
              body = {item.body}
            />
          )}
          ItemSeparatorComponent = {this.renderSeparator}
          keyExtractor={item => item.id.toString()}
        />

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
