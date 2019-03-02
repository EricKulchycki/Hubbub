import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome';
import '../css/AddDeleteFriend.css';

export class AddDeleteFriend extends Component {
  constructor(props) {
    super(props)
    this.addDeleteFriend = this.addDeleteFriend.bind(this)
  }
  addDeleteFriend() {
      //console.log(this.props.friend)
      if (this.props.friend.id === this.props.user.id) {
        return null
      }

      else if (!this.props.checkFriend(this.props.friend) ) { // id does not exist in the user's friend's list
        return <FontAwesome name="plus-square" size="lg" className="btn-style"  
        onClick={() => this.props.addFriend(this.props.friend)}/>
      }

      else {
        return <FontAwesome name="minus-square" size="lg" className="btn-style"
        onClick={() => this.props.deleteFriend(this.props.friend)}/>
      }
          
  }
  render() {
    return this.addDeleteFriend()
      
  }
}

export default AddDeleteFriend
