import React from 'react'
import {View, Text, StyleSheet} from "react-native"
import {Rating} from 'react-native-elements'

export default class HubFeedItem extends React.Component{
  render(){
    return(
      <View style={{paddingHorizontal: 5}}>
        <Text style = {styles.name}>
          {this.props.name}
        </Text>
        <Text style = {styles.title}>
          {this.props.title}
        </Text>
        <Rating
          startingValue = {this.props.rating}
          readonly = {true}
          imageSize = {25}
          style = {styles.rating}
        />
        <Text style = {styles.body}>
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
    fontSize: 15
  }
});
