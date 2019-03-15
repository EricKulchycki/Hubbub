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
import {SearchBar} from 'react-native-elements';
import * as Paths from '../constants/Paths';
import {makeRequest} from '../components/Utils'

export default class HubSearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      friendData: this.props.friendData,
      userData: [],
      error: null,
    };

    this.friendArrayholder = this.props.friendData; // Hold Friends List data
    this.userArrayHolder = []; //Hold User List Data
  }

  componentDidMount(){
    this.makeRemoteRequest;
  }

  makeRemoteRequest = () => {
    const url = Paths.SERVER + Paths.getAllUsers;
    this.setState({loading:true});

    makeRequest('GET', url).then(response => {
      this.setState({userData: response});
      this.userArrayHolder = response;
    });
    
    this.setState({loading: false});
  }

  searchFilterFunction = text => {
    this.setState({
      value: text,
    });

    const newData = this.arrayholder.filter(item => {
      const itemData = `${item.name.first.toUpperCase()} ${item.name.last.toUpperCase()}`;
      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      data: newData,
    });
  };

  renderHeader = () => {
    return (
     <SearchBar
       placeholder="Type Here..."
       lightTheme
       round
       onChangeText={text => this.searchFilterFunction(text)}
       autoCorrect={false}
       value={this.state.value}
     />
   );
  };

  renderItem = (item) => {
    name = item.user.username;

  }

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '86%',
          backgroundColor: '#CED0CE',
          marginLeft: '14%',
        }}
      />
    );
  };

  render() {
    return(
        <View style = {{flex: 0}}>
          <FlatList
              data = {this.state.data}
              renderItem = {({item}) => this.renderItem({item})}
              ListHeaderComponent = {this.renderHeader}
              ItemSeparatorComponent = {this.renderSeparator}
          />
        </View>

    );
  }

}
