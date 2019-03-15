import React, { Component } from 'react';
import Header from './Header'
import Post from '../components/Post';
import '../css/Postform.css';
import '../css/Application.css';
import '../css/MainPage.css';
import axios from 'axios';

export class MainPage extends Component {
  constructor(props) {
    super(props)
    this.componentDidMount = this.componentDidMount.bind(this)

    this.state = {
      user: JSON.parse(window.sessionStorage.getItem("user")),
      posts: [],
      friends: [],
    };
  }
  
  componentDidMount() {
    this.getFriendsPosts();
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
			<div>
        <Header />
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