import React, { Component } from 'react';
import Header from './Header'
import Post from '../components/Post';
import '../css/Application.css';
import '../css/MainPage.css';
import axios from 'axios';
import PostForm from './PostForm';




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
      this.setState({ posts : response.data.reverse()}); 
    }
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    return (
		// load a list of posts. In the posts themselves, define how they should look. Then have the container just display that
		<div className="mainpage-background"> 
			<div className="header-layout">
        <Header />
			</div>
			<div className="application-background-primary">
				<div className="application-background-secondary post-list-layout">
					<h1 className="activity-feed">Activity Feed</h1>
					<div>
						{this.state.posts.map(post => (
							<li key={post.id}>
								<Post post={post} />
							</li>
            ))}
					</div>
				</div>
        <PostForm />
			</div>
    </div>
    
    );
  }
}

export default MainPage;