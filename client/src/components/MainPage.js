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
    //const { data } = this.props.location
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
    this.getPosts();

    this.getFriends();
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

  getFriends() {
    let friendUri = "http://localhost:4000/api/v1/friend/" + this.state.user.id
    //console.log(friendUri)
    axios.get(friendUri)
    .then((response) => {

      if(response.data === null){
        return this.setState({ friends : []});
      }
      //console.log(response.data)
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

  // add other user
  addFriend = (newFriend) => {
    //console.log(newFriend.firstName)
    new Promise (() => {axios.post("http://localhost:4000/api/v1/friend/create", {
      userId: this.state.user.id, friendId: newFriend.id
    }).then(() => {this.getFriends(); this.getPosts()} );
    })
    //console.log(this.state.friends)
    /*let tempList = this.state.friends
    tempList.push(newFriend)
    this.setState({ friends: tempList})*/
  }

  // unfriend the other user
  deleteFriend = (byeFriend) => {
    new Promise (() => {axios.post("http://localhost:4000/api/v1/friend/delete", {
      userId: this.state.user.id, friendId: byeFriend.id
    }).then(() => {this.getFriends(); this.getPosts()} );
    })
    
    //console.log(this.state.friends)
    /*let tempList = this.state.friends
    let newList = tempList.filter(data => {
      return data.id !== byeFriend.id
    })
    this.setState({ friends: newList})*/
  }

  getPosts() {
    let reqURI = "http://localhost:4000/api/v1/posts/allFriends/" + this.state.user.id; //+1
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
		//load a list of posts. in the posts them self, define how they shoudl look. then have the container just display that
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



					/*<div>
						<PostForm updateFeed={this.updateFeed}/>
          </div>
          */

          
          

export default MainPage;
