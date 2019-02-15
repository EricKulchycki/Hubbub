import React from 'react';
import {View, Modal, Picker, Text, TextInput, ScrollView, TouchableHighlight} from 'react-native';
import {Icon, Rating, CheckBox} from 'react-native-elements';

export default class CreatePostModal extends React.Component{
    constructor(props){
      super(props);
      this.state = {
          modalVisible: false,
          pickerSelection: 'MOVIE',
          nameOfMedia: '',
          givenRating: 3,
          checked: false,
          details:'',
      };
    }

    setModalVisible = (visible) =>{
      this.setState({modalVisible:visible});
    }

    /*updates the state for given rating*/
      ratingCompleted = (rating) => {
        this.setState({givenRating: rating});
        alert(rating);
      }
    /*sends a post request then refreshes the feed*/
    createNewPost = () => {
        const url = 'http://142.93.147.148:4000';
        console.log(this.state.nameOfMedia);
        console.log(this.state.pickerSelection);
        console.log(this.state.details);
        console.log(this.state.givenRating);
        if(!this.state.checked){
          fetch(url + '/api/v1/post/create', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              title: this.state.nameOfMedia,
              category: this.state.pickerSelection,
              body: this.state.details,
              userId: 1,
              rating: this.state.givenRating,
            }),
          });
        }
        else{
          alert("No post created");
        }
        this.props.refreshFeed();
        this.setModalVisible(false);
    }

    render(){
      return(
        <View style={{flex:1}}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            alert('Modal has been closed.');
            this.setModalVisible(false);
          }}>
          <ScrollView>
            <View style={{paddingHorizontal: 5, marginTop: 22}}>
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
                <Picker.Item label="Movie" value="MOVIE"/>
                <Picker.Item label="TV-Show" value="TV-SHOW"/>
                <Picker.Item label="Video Game" value="VIDEO GAME"/>
                <Picker.Item label="Comic" value="COMIC"/>
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

            </View>
          </ScrollView>

          <TouchableHighlight
            style={{position: 'absolute', alignSelf: 'flex-start', bottom: 0}}
            onPress={() => {
              this.setModalVisible(false);
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
              this.createNewPost();
            }}>
            <Icon
              reverse
              name='add-circle'
              type='material'
              size={24}
              color='#a93226'/>
          </TouchableHighlight>
        </Modal>
        </View>
      );
    }
}
