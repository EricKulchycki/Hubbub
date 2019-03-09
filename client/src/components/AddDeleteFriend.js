import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome';
import '../css/AddDeleteFriend.css';

export class AddDeleteFriend extends Component {
  constructor(props) {
    super(props)
    this.addDeleteFriend = this.addDeleteFriend.bind(this)
  }

  // add or delete a friend
  addDeleteFriend() {
      if (this.props.friend.id === this.props.user.id) { // if id is equal to the user' id, do nothing
        return null
      }

      else if (!this.props.checkFriend(this.props.friend) ) { // if id does not exist in the user's friends list, return add button
        return <FontAwesome name="plus-square" size="lg" className="btn-style"  
        onClick={() => this.props.addFriend(this.props.friend)}/>
      }

      else { // if id exists in the user's friends list, return delete button
        return <FontAwesome name="minus-square" size="lg" className="btn-style"
        onClick={() => this.props.deleteFriend(this.props.friend)}/>
      }
          
  }
  render() {
    return this.addDeleteFriend()
  }
}

export default AddDeleteFriend
