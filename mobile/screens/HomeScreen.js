import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  TouchableHighlight,
  Picker,
  TextInput
} from 'react-native';

import SearchableDropdown from 'react-native-searchable-dropdown';
import {Header, Icon, Button, Rating, CheckBox} from 'react-native-elements';

import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';

var items = [
  {id: 1, name:'Eric',}, {id:2, name:'Ericson',}, {id:3, name:'John',}, {id:4, name:'test4',},
];


export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    modalVisible: false,
    pickerSelection: '',
    nameOfMedia: '',
    checked: false,
    details: '',
  };

  setModalVisible(visible){
    this.setState({modalVisible: visible});
  }

  ratingCompleted(rating){
    alert(rating)
  }

  render() {
    return (
      <View style={styles.container}>
        <Header backgroundColor = "#FF0000"
          leftComponent={
            <Icon
              containerStyle={{right: 37}}
              reverse
              name='alpha-h'
              type='material-community'
              size={50}
              color='#FF0000'
            />
          }
          //rightComponent={{icon: 'add-circle', color: '#fff'}}
        />


        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

        </ScrollView>

        <SearchableDropdown
          onTextChange={text => alert(text)}
          onItemSelect={item => alert(JSON.stringify(item))}
          containerStyle={{padding: 10, width: 300, position: 'absolute', alignSelf: 'center', top: 22}}
          textInputStyle={{
            padding: 5,
            paddingHorizontal: 10,
            borderWidth: 1,
            borderColor: '#fff',
            borderRadius: 5,
            color: '#fff',
          }}
          itemStyle={{
            padding: 10,
            marginTop: 2,
            backgroundColor: '#fff',
            borderColor: '#f00',
            borderWidth: 1,
            borderRadius: 5,
          }}
          itemTextStyle={{color: '#000'}}
          itemsContainerStyle={{maxHeight: 130}}
          items={items}
          // defaultIndex={2}
          placeholder="Search"
          underlineColorAndroid="transparent"
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
                  <Picker.Item label="Category 1" value="cat1"/>
                  <Picker.Item label="Category 2" value="cat2"/>
                  <Picker.Item label="Category 3" value="cat3"/>
                </Picker>

                <Text style = {{paddingTop: 10, fontSize: 22}}>
                Name of media
                </Text>
                <TextInput
                  style = {{paddingHorizontal: 5, borderColor: 'gray', borderWidth: 1}}
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
                  style = {{paddingHorizontal: 5, borderColor: 'gray', borderWidth: 1}}
                  onChangeText={(details) => this.setState({details})}
                  value={this.state.details}
                />

                <TouchableHighlight
                  style={{position: 'relative', left: 340}} 
                  onPress={() => {
                    this.setModalVisible(!this.state.modalVisible);
                  }}>
                  <Icon
                    reverse
                    name='add-circle'
                    type='material'
                    size={24}
                    color='#FF0000'/>
                </TouchableHighlight>

              </View>
            </View>
          </ScrollView>
        </Modal>

        <Button
          buttonStyle={{bottom: 5, left: 355, height: 50, width: 50, borderRadius: 25}}
          icon={
            <Icon
              reverse
              name='add-circle'
              type='material'
              size={24}
              color='#FF0000'/>
          }
          onPress={() => {
            this.setModalVisible(true);
          }}
        />

      </View>
    );
  }


  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };
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
