import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  List,
  FlatList,
  Modal,
  TouchableHighlight,
  Picker,
  TextInput,
  ActivityIndicator,
  ListView
} from 'react-native';
import {Header, Icon, Rating, CheckBox} from 'react-native-elements';
import HubFeedItem from '../components/HubFeedItem';
import SearchableDropdown from 'react-native-searchable-dropdown';
import { WebBrowser } from 'expo';

var friendsList;


export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props){
    super(props);
    this.state = {
      modalVisible:false,
      pickerSelection: 'MOVIE',
      nameOfMedia: '',
      givenRating: 3,
      checked: false,
      details:'',
      friendData: [],
      loading: true,
      data: [],
      error:null,
      user:props.user,
    };
  }

  arrayholder = [];

/*React calls this after all the elements of the page is rendered correctly*/
  componentDidMount(){
    const url = 'http://142.93.147.148:4000';
    this.setState({loading: true});

    fetch(url + '/api/v1/posts/all')
    .then((res) => res.json())
    .then((resJson) => {
      this.setState({
        data: resJson,
        loading: false,
      });
      console.log(resJson[0].title);
      this.arrayholder = resJson
    })
    .catch(error => {
      console.log("cannot get posts");
      this.setState({ error, loading:false });
    })

    fetch(url + '/api/v1/friend/1', {
      method: 'GET'
    })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);
      this.setState({
        loading: false,
        friendData: responseJson,
      }, function(){

      });
    })
    .catch((error) => {
      console.error(error);
    });
  }

/*updates the state if the new post pop up is visible*/
  setModalVisible = (visible) => {
    this.setState({modalVisible: visible});
  }
/*updates the state for given rating*/
  ratingCompleted = (rating) => {
    this.setState({givenRating: rating});
    alert(rating);
  }
/*sends a post request then refreshes the feed*/
  createNewPost = () => {
    const url = 'http://142.93.147.148:4000';
    console.log(this.state.nameOfMedia);
    console.log(this.state.pickerSelection);
    console.log(this.state.details);
    console.log(this.state.givenRating);
    if(!this.state.checked){
      fetch(url + '/api/v1/post/create', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: this.state.nameOfMedia,
          category: this.state.pickerSelection,
          body: this.state.details,
          userId: 1,
          rating: this.state.givenRating,
        }),
      });
    }
    else{
      alert("No post created");
    }
    this.refreshHubFeed();
    this.setModalVisible(!this.state.modalVisible);


  }
/*sends another get request for posts to update the feed*/
  refreshHubFeed = () => {
    const url = 'http://142.93.147.148:4000';
    this.setState({loading: true});

    fetch(url + '/api/v1/posts/all')
    .then((res) => res.json())
    .then((resJson) => {
      this.setState({
        data: resJson,
      });
      console.log(resJson[0].title);
      this.arrayholder = resJson
    })
    .catch(error => {
      console.log("cannot get posts");
      this.setState({ error, loading:false });
    })
    this.setState({loading: false});
  }

  renderSeparator = () => (
    <View
      style={{
        backgroundColor: 'red',
        height: 0.5,
      }}
    />
  );


  render() {
    if(this.state.loading){
      return(
        <View style={{flex: 1, justifyContent: 'center', flexDirection: 'row'}}>
          <ActivityIndicator size='small' color="#d98880"/>
        </View>
      );
    }
    friendsList = this.state.friendData.map(function(item){
      return {
        id: item.user.id,
        name: item.user.firstName + " " + item.user.lastName
      };
    });
    console.log(this.state.data);

    return (
      <View style={styles.container}>
        <Header backgroundColor = "#a93226"
          leftComponent={
              <Icon
                iconStyle={{alignSelf: 'flex-start', paddingRight: 10}}
                name='alpha-h'
                type='material-community'
                size={50}
                color='#ccd1d1'
              />
          }
        />

        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            alert('Modal has been closed.');
            this.setModalVisible(!this.state.modalVisible);
          }}>
          <ScrollView>
            <View style={{paddingHorizontal: 5, marginTop: 22}}>
              <Text style = {{fontWeight: 'bold', fontSize: 34}}>
              New Post
              </Text>

              <Text style = {{paddingTop: 10, fontSize: 22}}>
              Category
              </Text>
              <Picker
                selectedValue={this.state.pickerSelection}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({pickerSelection: itemValue})
                }>
                <Picker.Item label="Movie" value="MOVIE"/>
                <Picker.Item label="TV-Show" value="TV-SHOW"/>
                <Picker.Item label="Video Game" value="VIDEO GAME"/>
                <Picker.Item label="Comic" value="COMIC"/>
              </Picker>

              <Text style = {{paddingTop: 10, fontSize: 22}}>
                Name of media
              </Text>
              <TextInput
                style = {{paddingHorizontal: 5, borderColor: '#ccd1d1', borderWidth: 1}}
                onChangeText={(nameOfMedia) => this.setState({nameOfMedia})}
                value={this.state.nameOfMedia}
              />

              <Text style = {{paddingTop: 10, fontSize: 22}}>
              Rating
              </Text>
              <Rating
                onFinishRating={this.ratingCompleted}
              />
              <CheckBox
                title='Disable Rating'
                checked={this.state.checked}
                onPress={() => this.setState({checked: !this.state.checked})}
              />

              <Text style = {{paddingTop: 10, fontSize: 22}}>
              Details
              </Text>
              <TextInput
                multiline={true}
                textAlignVertical= 'top'
                scrollEnabled={true}
                numberOfLines={4}
                style = {{paddingHorizontal: 5, borderColor: '#ccd1d1', borderWidth: 1}}
                onChangeText={(details) => this.setState({details})}
                value={this.state.details}
              />

            </View>
          </ScrollView>

          <TouchableHighlight
            style={{position: 'absolute', alignSelf: 'flex-start', bottom: 0}}
            onPress={() => {
              this.setModalVisible(!this.state.modalVisible);
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
              this.createNewPost();
            }}>
            <Icon
              reverse
              name='add-circle'
              type='material'
              size={24}
              color='#a93226'/>
          </TouchableHighlight>
        </Modal>

        <FlatList
          data = {this.state.data}
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
        <SearchableDropdown
          onTextChange={text => alert(text)}
          onItemSelect={friendsList => alert(JSON.stringify(friendsList))}
          containerStyle={{padding: 10, width: 300, position: 'absolute', alignSelf: 'center', top: 22}}
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
            borderColor: '#a93226',
            borderWidth: 1,
            borderRadius: 5,
         }}
         itemTextStyle={{color: '#000'}}
         itemsContainerStyle={{maxHeight: 130}}
         items={friendsList}
         placeholder="Search"
         underlineColorAndroid="transparent"
        />
        <TouchableHighlight
          style={{position: 'absolute', alignSelf: 'flex-end', bottom: 0}}
          onPress={() => {
            this.setModalVisible(true);
          }}>
          <Icon
            reverse
            name='add-circle'
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
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
