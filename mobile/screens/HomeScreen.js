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
import {Header, Icon, SearchBar, ListItem} from 'react-native-elements';
import HubFeedItem from '../components/HubFeedItem';
import CreatePostModal from '../screens/CreatePostModal';
import {makeRequest} from '../components/Utils'
import * as Colors from '../constants/Colors';
import * as Paths from '../constants/Paths';

var friendsList;
const url = Paths.domain;
var userID;


export default class HomeScreen extends React.Component {
/*Render Header*/
  static navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state;
    return {
      headerStyle:{
        backgroundColor: Colors.MAIN_RED,
      },
      headerLeft: (
        <Image
          style = {{
            height: 32,
            width: 32
          }}
          source = {require('../assets/images/logo_t_512.png')}
          />
      ),
      headerTitle: params && params.headerTitle,
      headerRight: (
        <TouchableHighlight
          onPress={() =>
            navigation.navigate('Profile', {user: params.user, creating: false})
          }>
          <Icon
            iconStyle={{alignSelf: 'flex-start'}}
            name='perm-identity'
            type='material'
            size={35}
            color='#FFF'
          />
        </TouchableHighlight>
      )
    }
  };

  constructor(props){
    super(props);
    this.state = {
      friendData: [],
      loading: true,
      gotPosts: false,
      postData: [],
      searchResults: [],
      searchInput: '',
      error:null,
      user: this.props.navigation.getParam('user', {})
    };
  }

/*React calls this after all the elements of the page is rendered correctly*/
  componentDidMount = () => {
    userID = this.state.user.id;
    makeRequest('GET', Paths.getFriendsPosts + userID).then(response => {
      this.setState({postData: response.reverse()});
    });

    makeRequest('GET', Paths.getFriends + userID).then(response => {
      this.setState({friendData: response});
    });

    this.props.navigation.setParams({
      headerTitle: this.searchbar()
    });
    this.setState({loading: false});
  }

/*Set up the searchbar in the header*/
  searchbar = () =>{
    return(
    <SearchBar
      containerStyle = {{backgroundColor: Colors.MAIN_RED, width:'100%'}}
      inputContainerStyle = {{backgroundColor: '#FFF'}}
      inputStyle = {{color: '#515a5a'}}
      placeholder = {"Search Here..."}
      lightTheme
      round
      onChangeText={text => this.searchForUsers(text)}
      onClear = {() => this.clearSearch}
      onCancel = {() => this.clearSearch}
      value = {this.props.navigation.getParam('searchInput',{})}
      autoCorrect={false}
    />
    )
  };

/*Used by the searchbar to update its search results*/
  searchForUsers = (text) => {
    this.props.navigation.setParams({searchInput: `${text}`});
    if(text !== ""){
      const body = {"firstName": text};
      makeRequest('POST', Paths.getAllUsers, body).then(response => {
        this.setState({
          searchResults: response
        });
      });
    }
    else{
      this.setState({
        searchResults: []
      });
    }
  };

  addFriend = (friend) => {
    friendID = friend.id;
    console.log("Adding Friend: " + friendID);
    body = {userId: this.state.user.id, friendId: friendID};
    makeRequest('POST', Paths.addFriend, body);
    makeRequest('GET', Paths.getFriends + this.state.user.id).then(response => {
      this.setState({
        friendData: response,
        loading:true
      });
      this.refreshHubFeed();
    });
  }

  removeFriend = (friend) => {
    friendID = friend.id;
    console.log("Removing Friend: " + friendID);
    body = {userId: this.state.user.id, friendId: friendID};
    makeRequest('POST', Paths.removeFriend, body);
    makeRequest('GET', Paths.getFriends + this.state.user.id).then(response => {
      this.setState({
        friendData: response,
        loading: true
      });
      this.refreshHubFeed();
    });
  }

/*sends another get request for posts to update the feed*/
  refreshHubFeed = () => {
    makeRequest('GET', Paths.getFriendsPosts + userID).then(response => {
      this.setState({postData: response.reverse()});
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

/*renders each item in the searchResults*/
  renderSearchResultItem = ({item}) => {
    let check = this.state.friendData.some(function(friend){
      return friend.user.id === item.id;
    });
    let name = item.firstName + " " + item.lastName;
    let friendStatus;
    let pictureSource;
    if(check){
      friendStatus =
      <TouchableHighlight onPress={() => this.removeFriend(item)}>
        <Icon
          iconStyle = {{alignSelf: 'flex-end'}}
          name = 'account-minus'
          type = 'material-community'
          size = {30}
        />
      </TouchableHighlight>;
    }
    else {
      friendStatus =
      <TouchableHighlight onPress={() => this.addFriend(item)} >
        <Icon
          name = 'person-add'
          type = 'material'
          size = {30}
        />
      </TouchableHighlight>;
    }
    if(item.picture !== null){
      pictureSource = item.picture;
    }
    else{
      pictureSource = Paths.DEFAULT_USER;
    }
    return(
        <ListItem
          containerStyle = {{borderColor: '#515a5a', borderWidth: 1, borderRadius: 10}}
          title={name}
          rightElement = {friendStatus}
          leftAvatar = {{source: {uri: pictureSource} }}
        />
    );
  }//renderItem

/*Set up and render the timeline*/
  renderTimeline = () => {
    if(this.state.loading){
      return(
        <View style={{flex: 1, justifyContent: 'center', flexDirection: 'row'}}>
          <ActivityIndicator size='large' color="#d98880"/>
        </View>
      );
    }
    if(this.state.friendData !== undefined){
      friendsList = this.state.friendData.map(function(item){
        return item.user.id;
      });
    }
    if(friendsList.length != 0){
      return(
        <FlatList
          data = {this.state.postData}
          renderItem={({item}) => (
            <HubFeedItem
              name = {`${item.user.firstName} ${item.user.lastName}`}
              title = {item.title}
              rating = {item.rating}
              body = {item.body}
              spoiler = {item.spoiler}
              picture ={item.user.picture}
              time = {item.createdAt}
              postID = {item.id}
              myPosts = {false}
            />
          )}
          ItemSeparatorComponent = {this.renderSeparator}
          keyExtractor={item => item.id.toString()}
          refreshing={this.state.loading}
          onRefresh={this.refreshHubFeed}
        />
      );
    }
    else{
      return(
        <Text style = {styles.noFriendsText}>Try Searching for Friends to see what is all the Hubbub!</Text>
      );
    }

  }

/*Render the search result list*/
  renderSearchResults = () => {
    return(
      <View style = {{position:'absolute',alignSelf:'center',top:0,flex:1,maxHeight:500, width: 250, backgroundColor: 'transparent'}}>
        <FlatList
            style = {{width: 250, flex:1, overflow: 'hidden'}}
            data = {this.state.searchResults}
            renderItem = {({item}) => this.renderSearchResultItem({item})}
            ItemSeparatorComponent = {this.renderSeparator}
            keyExtractor = {item => item.id.toString()}
        />
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderTimeline()}
        {this.renderSearchResults()}
        <CreatePostModal
          ref = {createPost => {this.createPost = createPost}}
          refreshFeed = {() => { this.refreshHubFeed()}}
          user = {this.state.user}
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
    fontSize: 22,
    textAlign: 'center'
  }
});
