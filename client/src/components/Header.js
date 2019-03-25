import React, { Component } from 'react';
import logo from './images/hubbub_logo_favicon.png'
import '../css/Header.css';
import '../css/Application.css';
import Search from './Search';
import 'bootstrap/dist/css/bootstrap.min.css';
import {withRouter} from 'react-router';
import { Row, Button,} from 'reactstrap';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUser} from '@fortawesome/free-solid-svg-icons';

export class Header extends Component {
	constructor(props) {
		super(props)
		this.switchToProfile = this.switchToProfile.bind(this)
		this.returnToMain = this.returnToMain.bind(this)

		this.state = {
			user: JSON.parse(window.sessionStorage.getItem("user")),
			people: [],
			friends: [],
		}
	}

	componentDidMount() {
		this.getFriends();
}

	// query database for user suggestions by using user input
	searchUsers = (firstName) => {
		if (firstName.length <= 0) {
			this.setState({ people: []});
			return;
		}
		axios.post("http://localhost:4000/api/v1/user/list", {
			firstName: firstName
		}).then(res => { this.setState({ people: res.data}); });
	}

	// retrieve a list of user's friends
	getFriends() {
		let friendUri = "http://localhost:4000/api/v1/friend/" + this.state.user.id
		axios.get(friendUri).then((response) => {
			if(response.data === null){
				return this.setState({ friends : []});
			}
			
			this.setState({ friends : response.data});
		})
		.catch(function (error) {
			console.log(error);
		});
	}

	// check if new user is a friend
	checkFriend = (user) => {
		const check = this.state.friends.some(function (friend) {
			return friend.user.id === user.id;
		})
		return check
	}

	// add other user as a friend
	addFriend = (newFriend) => {
		new Promise (() => {axios.post("http://localhost:4000/api/v1/friend/create", {
			userId: this.state.user.id, friendId: newFriend.id
			}).then(() => {this.getFriends(); this.getFriendsPosts()} );
		})
	}

	// unfriend the other user
	deleteFriend = (byeFriend) => {
		new Promise (() => {axios.post("http://localhost:4000/api/v1/friend/delete", {
			userId: this.state.user.id, friendId: byeFriend.id
			}).then(() => {this.getFriends(); this.getFriendsPosts()} );
		})
	}

	// retrieve posts of the user's friends
	getFriendsPosts() {
		let reqURI = "http://localhost:4000/api/v1/posts/allFriends/" + this.state.user.id;
		axios.get(reqURI)
		.then((response) => {
			if(response.data != null){
			this.setState({ posts : response.data});
			}
		})
		.catch(function (error) {
			console.log(error);
		});
	}

	// move to the profile page
	switchToProfile() {
		this.props.history.push({
			pathname: '/profile',
		});
	}
 
	// returns to the main page
	returnToMain() {
		this.props.history.push({
			pathname: '/main',
		});
	}
 
	render() {
		return (
		<header className="header-layout">
			<Row className = "header-bar" >
			<div className ="icon-container">    
				<img onClick={this.returnToMain} className="logo-style" alt="logo" src={logo} />
			</div>
			<div className="search-container">
				<Search ser={this.state.people} user={this.state.user} searchUsers={this.searchUsers} 
				checkFriend={this.checkFriend} addFriend={this.addFriend} deleteFriend={this.deleteFriend}/>
			</div>
			<div className="profile-container">
				<Button className="prof-style" onClick={this.switchToProfile} color="secondary"><div className="prof-text-style">Profile     <FontAwesomeIcon icon={faUser} size="xs"/></div></Button>{' '}
			</div>
			</Row>
		</header>
		);
	}
}

export default withRouter(Header)
