import React, { Component } from 'react'
import '../css/AddDeleteFriend.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus, faUserMinus } from '@fortawesome/free-solid-svg-icons'

export class AddDeleteFriend extends Component {
	constructor(props) {
		super(props)
		this.addDeleteFriend = this.addDeleteFriend.bind(this)
	}

	// add or delete a friend
	addDeleteFriend() {
		// if id does not exist in the user's friends list, return add button
		if (!this.props.checkFriend(this.props.friend) ) { 
			return <FontAwesomeIcon icon={faUserPlus} size="lg" className="add-delete-btn-style"  
				onClick={() => this.props.addFriend(this.props.friend)}/>
		}else { // if id exists in the user's friends list, return delete button
			return <FontAwesomeIcon icon={faUserMinus} size="lg" className="add-delete-btn-style"
				onClick={() => this.props.deleteFriend(this.props.friend)}/>
		}		
	}
	render() {
		return this.addDeleteFriend()
	}
}

export default AddDeleteFriend
