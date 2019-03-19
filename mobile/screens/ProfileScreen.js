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
} from 'react-native';
import {Header, Icon} from 'react-native-elements';
import * as Colors from '../constants/Colors';
import * as Paths from '../constants/Paths';
import HubFeedItem from '../components/HubFeedItem';

const url = Paths.domain;

export default class ProfileScreen extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      user: this.props.navigation.getParam('user', {}),
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

  refresh(){
    alert("REFRESH THE PAGE");
  }

  componentDidMount = () => {
    this.makeRequest('GET', Paths.getPostByUserID + this.state.user.id).then(response => {
      this.setState({postData: response});
    });
    console.log("kekeke");
    console.log(this.state.postData);
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
            spoiler = {item.spoiler}
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
          style = {{width: 150, height: 150, alignSelf: 'center',
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
            {this.state.user.firstName + " " +this.state.user.lastName}
          </Text>

          <Text style = {{paddingTop: 10, fontSize: 22}}>
            Age:
          </Text>
          <Text>
            {this.state.user.age}
          </Text>
        </View>

        <View style = {{borderBottomColor: '#000', borderBottomWidth: 1}}/>
        {timeline}

        <Text style = {{color: '#FFF', fontSize: 50, textAlign: 'center'}}>
          FOOTER
        </Text>

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
            this.props.navigation.navigate('Edit', {user: this.state.user, onGoBack:() => this.refresh()});
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
