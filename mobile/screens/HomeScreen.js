import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableHighlight,
  ActivityIndicator,
  ListView,
  Image
} from 'react-native';
import {Header, Icon} from 'react-native-elements';
import HubFeedItem from '../components/HubFeedItem';
import SearchableDropdown from 'react-native-searchable-dropdown';
import CreatePostModal from '../screens/CreatePostModal';
import { WebBrowser } from 'expo';
import * as Colors from '../constants/Colors';
import * as Paths from '../constants/Paths';

var friendsList;
const url = Paths.SERVER;
var userID;


export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props){
    super(props);
    this.state = {
      friendData: [],
      loading: true,
      gotPosts: false,
      postData: [],
      error:null,
      user: this.props.navigation.getParam('user', {})
    };
  }

  makeRequest(type, resource){
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

/*React calls this after all the elements of the page is rendered correctly*/
  componentDidMount = () => {
    userID = this.state.user.id;
    this.makeRequest('GET', Paths.getFriendsPosts + userID).then(response => {
      this.setState({postData: response});
    });
    console.log("post data")
    console.log(this.state.postData);

    this.makeRequest('GET', Paths.getFriends + userID).then(response => {
      this.setState({friendData: response});
    });
    console.log("friend data")
    console.log(this.state.friendData);

    this.setState({loading: false});
  }

/*sends another get request for posts to update the feed*/
  refreshHubFeed = () => {
    this.makeRequest('GET', Paths.getFriendsPosts + userID).then(response => {
      this.setState({postData: response});
    });
    this.setState({loading: false});
  }

/*render lines FlatList*/
  renderSeparator = () => (
    <View
      style={{
        backgroundColor: '#5e5f60',
        height: 0.5,
      }}
    />
  );

  render() {
    let timeline;
    if(this.state.loading){
      return(
        <View style={{flex: 1, justifyContent: 'center', flexDirection: 'row'}}>
          <ActivityIndicator size='large' color="#d98880"/>
        </View>
      );
    }
    if(this.state.friendData !== undefined){
      friendsList = this.state.friendData.map(function(item){
        return {
          id: item.user.id,
          name: item.user.firstName + " " + item.user.lastName
        };
      });
    }

    if(friendsList.length != 0){
      console.log("Got posts from friends");
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
      console.log("User doesn't have any friends");
      timeline = <Text style = {styles.noFriendsText}>Try Searching for Friends to see what is all the Hubbub!</Text>;
    }



    return (
      <View style={styles.container}>
        <Header backgroundColor = {Colors.MAIN_RED}
          leftComponent={
            <Image
              style = {styles.icon}
              source = {require('../assets/images/logo_t_512.png')}
            />
          }
          centerComponent = {
            <SearchableDropdown
              onItemSelect={friendsList => alert(JSON.stringify(friendsList))}
              containerStyle={{padding: 10, width: 300, alignSelf: 'center'}}
              textInputStyle={{
                padding: 5,
                paddingHorizontal: 10,
                borderWidth: 1,
                borderColor: '#ccd1d1',
                borderRadius: 5,
                color: '#ccd1d1',
              }}
              itemStyle={{
                padding: 10,
                marginTop: 2,
                backgroundColor: '#ccd1d1',
                borderColor: Colors.MAIN_RED,
                borderWidth: 1,
                borderRadius: 5,
              }}
              itemTextStyle={{color: '#000'}}
              itemsContainerStyle={{maxHeight: 130}}
              items={friendsList}
              placeholder="Search"
              underlineColorAndroid="transparent"
            />
          }
          rightComponent={
            <TouchableHighlight
              onPress={() =>
                this.props.navigation.navigate('Profile', {user: this.state.user, creating: false})
              }>
              <Icon
                iconStyle={{alignSelf: 'flex-start'}}
                name='perm-identity'
                type='material'
                size={35}
                color='#ccd1d1'
                />
            </TouchableHighlight>
          }
        />
        {timeline}
        <CreatePostModal
          ref = {createPost => {this.createPost = createPost}}
          refreshFeed = {() => { this.refreshHubFeed()}}
        />
        <TouchableHighlight
          style={{position: 'absolute', alignSelf: 'flex-end', bottom: 0}}
          onPress={() => {
            this.createPost.setModalVisible(true);
          }}>
          <Icon
            reverse
            name='add-circle'
            type='material'
            size={24}
            color= {Colors.MAIN_RED} />
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
  icon: {
    height: 32,
    width: 32
  },
  noFriendsText: {
    textAlign: 'center'
  }
});
