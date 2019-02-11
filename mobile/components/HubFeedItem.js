import React from 'react'
import {View, Text, StyleSheet} from "react-native"
import {Rating} from 'react-native-elements'

export default class HubFeedItem extends React.Component{
  render(){
    return(
      <View>
        <Text style = {styles.name}>
          {post.userID}
        </Text>
        <Text style = {styles.title}>

        </Text>
        <Rating
          startingValue = {post.rating}
          readonly = {true}
        />
        <Text style = {styles.rating}>

        </Text>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{},
  imageContainer:{},
  contentContainer:{},
  name:{},
  title:{},
  rating:{},
  body:{}
})
