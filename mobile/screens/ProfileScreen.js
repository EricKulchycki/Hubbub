import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ScrollView,
} from 'react-native';
import {Header, Icon} from 'react-native-elements';



export default class ProfileScreen extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      user: null,
    };

  }
  static navigationOptions = () => ({
    header: null,
  });


  render() {
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

        <ScrollView>
          <View style={{paddingHorizontal: 5, marginTop: 22}}>

          </View>
        </ScrollView>


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
            alert("Save Profile");
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
  }
});
