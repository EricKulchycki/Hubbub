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
  AsyncStorage
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
      picture: null,
      user: this.props.navigation.getParam('user', {}),
      loading: false,
      postData: [],
    };
  }

  static navigationOptions = () => ({
    header: null,
  });


  refresh = async() => {
    this.setState({loading:true});
    try{
      userData = await AsyncStorage.getItem('USER');
      if(userData !== null){
        userData = JSON.parse(userData);
        this.setState({
          user: userData,
          username: userData.username,
          age: userData.age,
          picture: userData.picture
        });
        makeRequest('GET', Paths.getPostByUserID + this.state.user.id).then(response => {
          this.setState({postData: response});
        });
      }
    }
    catch(error){
      console.log(error);
    }
    this.setState({loading:false});
  }

  componentDidMount = () => {
    makeRequest('GET', Paths.getPostByUserID + this.state.user.id).then(response => {
      this.setState({postData: response});
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
    else if(this.state.postData.length != 0){
      timeline = <FlatList
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
            myPosts = {true}
          />
        )}
        ItemSeparatorComponent = {this.renderSeparator}
        keyExtractor={item => item.id.toString()}
      />;
    }
    else{
      timeline = <Text style = {styles.noPostsText}>It seems you have no posts!</Text>;
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
