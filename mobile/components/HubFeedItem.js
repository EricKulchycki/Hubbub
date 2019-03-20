import React from 'react'
import {View, Text, StyleSheet, Image} from "react-native"
import {Rating} from 'react-native-elements'
import {DEFAULT_USER} from '../constants/Paths';

export default class HubFeedItem extends React.Component{

  constructor(props){
    super(props);
    this.state = {pressStatus: false};
  }

  render(){
    let body;
    if(this.props.spoiler){
      body = <Text style = {
        this.state.pressStatus
        ? styles.body
        : styles.bodySpoiler}
        onPress={() => this.setState({pressStatus: !this.state.pressStatus})}>{this.props.body}</Text>;
    }
    else{
      body = <Text style = {styles.body}>{this.props.body}</Text>;
    }
    if(this.props.picture === null){
      pictureSource = DEFAULT_USER;
    }
    else{
      pictureSource = this.props.picture;
    }
    return(
      <View style={{paddingHorizontal: 5}}>
        <View style = {styles.nameContainer}>
          <Image
              style ={styles.userImage}
              source ={{uri: pictureSource}}
          />
          <View>
            <Text style = {styles.name}>
              {this.props.name}
            </Text>
            <Text style = {styles.createdTime}>
              {this.props.time}
            </Text>
          </View>
        </View>

        <Text style = {styles.title}>
          {this.props.title}
        </Text>
        <Rating
          startingValue = {this.props.rating}
          readonly = {true}
          imageSize = {25}
          style = {styles.rating}
        />
        {body}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{},
  nameContainer:{
    width: '100%',
    flex: 0,
    flexDirection: 'row'
  },
  name:{
    fontSize: 18
  },
  title:{
    fontWeight: 'bold',
    fontSize: 20
  },
  rating:{
    alignItems: 'flex-start'
  },
  body:{
    fontSize: 15,
    backgroundColor: '#FFF'
  },
  bodySpoiler:{
    fontSize: 15,
    backgroundColor: '#000'
  },
  userImage:{
    height: 50,
    width: 50,
    borderRadius: 50/2
  }
});
