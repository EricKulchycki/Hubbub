import React, { Component } from 'react';
import Header from './Header'
import Post from '../components/Post';
import '../css/Postform.css';
import '../css/Application.css';
import '../css/MainPage.css';
import axios from 'axios';

class MainPage extends Component {
  constructor(props) {
    super(props)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.updateFeed = this.updateFeed.bind(this)

    this.state = {
      user: JSON.parse(window.sessionStorage.getItem("user")),
      posts: [],
      people: [],
      friends: [],
    };
  }
  
  componentDidMount() {
    this.getFriends();
    this.getFriendsPosts();
}
  
  updateFeed(newArray){
    newArray = Array.from(newArray); 
    this.setState({posts: newArray})
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

  render() {
    return (
		// load a list of posts. In the posts themselves, define how they should look. Then have the container just display that
		<div>
			<div className="MainPage">
      <Header header={this.state.people} user={this.state.user} searchUsers={this.searchUsers} 
        checkFriend={this.checkFriend} addFriend={this.addFriend} deleteFriend={this.deleteFriend}/>
			</div>
			
      <div>Friends List
        <ul>
        {this.state.friends.map(friend => (
          <li key={friend.user.id}>
            {friend.user.firstName} {friend.user.lastName} &nbsp;
          </li>
        ))}
        </ul>
      </div>

			<div className="application-background-primary">
				<div className="application-background-secondary post-list-layout">
					<h1 className="text-center">Activity Feed</h1>
					<div>
						{this.state.posts.map(post => (
							<li key={post.id}>
								<Post post={post} />
							</li>
						))}
					</div>
				</div>
			</div>
		</div>
    );
  }
}

export default MainPage;
