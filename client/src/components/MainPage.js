import React, { Component } from 'react';
import Header from './Header'
import Post from '../components/Post';
import PostForm from './PostForm';
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
      
      posts: [],
      people: []
    };
 }
  
  componentDidMount() {
    let reqURI = "http://localhost:4000/api/v1/posts/allFriends/" + "1";
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
		axios.post(`http://localhost:4000/api/v1/user/list`, {
			firstName: firstName
		}).then(res => { this.setState({ people: res.data}); });
    }

  render() {
    
    return (
		//load a list of posts. in the posts them self, define how they shoudl look. then have the container just display that
		<div>
			<div className="MainPage">
				<Header header={this.state.people} />
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
					<div>
						<PostForm updateFeed={this.updateFeed}/>
					</div>
				</div>
			</div>
		</div>
    );
  }
}


export default MainPage;
