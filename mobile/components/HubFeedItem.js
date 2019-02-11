import React from 'react'
import {View, Text, StyleSheet} from "react-native"
import {Rating} from 'react-native-elements'

export default class HubFeedItem extends React.Component{
  render(){
    return(
      <View>
        <Text>
          {this.props.name}
        </Text>
        <Text>
          {this.props.title}
        </Text>
        <Rating
          startingValue = {this.props.rating}
          readonly = {true}
        />
        <Text>
          {this.props.body}
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
