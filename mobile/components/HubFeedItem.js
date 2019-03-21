import React from 'react';
import {View, Text, StyleSheet, Image, TouchableHighlight, Alert} from "react-native";
import {Rating, Icon} from 'react-native-elements';
import {DEFAULT_USER} from '../constants/Paths';
import * as Colors from '../constants/Colors';
import * as Paths from '../constants/Paths';

export default class HubFeedItem extends React.Component{

  constructor(props){
    super(props);
    this.state = {pressStatus: false};
  }

  deleteAPost(body){
    this.setState({loading: true});
    fetch(Paths.domain + Paths.deletePost, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        body
      ),
    });
    this.setState({loading: false});
  }

  render(){
    let title = this.props.title;
    let body;
    if(this.props.spoiler){
      body = <Text style = {
        this.state.pressStatus
        ? styles.body
        : styles.bodySpoiler}
        onPress={() => this.setState({pressStatus: !this.state.pressStatus})}>{this.props.body}</Text>;

        title += ' (SPOILER)';
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

    let deleteButton;
    if(this.props.myPosts){
      deleteButton =
        <TouchableHighlight
          style={{alignSelf: 'flex-end'}}
          onPress={() => {
            Alert.alert(
              'Delete Post',
              'Are you sure you want to delete this post?',
              [
                {
                  text: 'Cancel',
                  style: 'cancel'
                },
                {
                  text: 'OK',
                  onPress: () => this.deleteAPost({id: this.props.postID})
                },
              ],
            );
          }}>
          <Icon
            reverse
            name='clear'
            type='material'
            size={12}
            color= {Colors.MAIN_RED} />
        </TouchableHighlight>
    }

    let time = this.props.time;
    parseTime = time.substring(5,7) + '/' + time.substring(8,10) + '/' + time.substring(0,4);

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
              {parseTime}
            </Text>
          </View>
          {deleteButton}
        </View>

        <Text style = {styles.title}>
          {title}
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
