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

// var items = [
//   {id: 1, name:'Eric',}, {id:2, name:'Ericson',}, {id:3, name:'John',}, {id:4, name:'test4',},
// ];
var friendsList;


export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props){
    super(props);
    this.state = {
      modalVisible:false,
      pickerSelection: '',
      checked: false,
      nameOfMedia: '',
      details:'',
      friendData: [],
      loading: true,
      data: [],
      error:null,
      user:props.user
    };
  }

  arrayholder = [];


  componentDidMount(){
    const url = 'http://142.93.147.148:4000/api/v1/posts/all';
    this.setState({loading: true});

    fetch(url)
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

    fetch('http://142.93.147.148:4000/api/v1/friend/1', {
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

  setModalVisible(visible){
    this.setState({modalVisible: visible});
  }

  ratingCompleted(rating){
    alert(rating)
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
          <ActivityIndicator size={100} color="#d98880"/>
        </View>
      );
    }
    friendsList = this.state.friendData.map(function(item){
      return {
        id: item.user.id,
        name: item.user.firstName + " " + item.user.lastName
      };
    });
    //console.log(friendsList);
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
            <View>
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
                <Picker.Item label="Movie" value="0"/>
                <Picker.Item label="TV-Show" value="1"/>
                <Picker.Item label="Video Game" value="2"/>
                <Picker.Item label="Comic" value="3"/>
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

             <TouchableHighlight
               style={{position: 'relative', alignSelf: 'flex-end'}}
               onPress={() => {
                 this.setModalVisible(!this.state.modalVisible);
               }}>
               <Icon
                 reverse
                 name='add-circle'
                 type='material'
                 size={24}
                 color='#a93226'/>
             </TouchableHighlight>

             </View>
            </View>
         </ScrollView>
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
          // defaultIndex={2}
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
