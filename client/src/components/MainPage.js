import React, { Component } from 'react';
import Header from './Header'
import Post from '../components/Post';
import PostForm from './PostForm';
import '../css/Postform.css';
import axios from 'axios';
import FontAwesome from 'react-fontawesome';

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
    axios.get(`http://localhost:4000/api/v1/posts/all`)
    .then((response) => {
      
      if(response.data != null){
      this.setState({ posts : response.data});
      console.log(response);
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}
  
  updateFeed(newArray){
    newArray = Array.from(newArray);
    //console.log(newArray)
  //Array.prototype.push.apply(newArray,  this.posts);   
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
		}).then(res => { this.setState({ people: res.data}); console.log(res.data); });
    }

  render() {
    
    return (
      //load a list of posts. in the posts them self, define how they shoudl look. then have the container just display that
     <div>
     <div className="MainPage">
      <Header header={this.state.people} searchUsers={this.searchUsers}/>
	  			<div>
					<ul>
						{this.state.people.map(person => (
							<li key={person.id}>
								{person.firstName} {person.lastName} &nbsp;
								<FontAwesome name="plus-circle" size="1x" onClick={() => console.log("Pressed Add Friend " + person.id)}/>
							</li>
						))}
					</ul>
				</div>
     </div>
     
     <div style={{backgroundColor: '#cc3300'}}>
     <div style={{marginLeft: '25%', marginRight: '25%', backgroundColor: '#f4f4f4'}}>
         <h1 style={{textAlign: 'center'}}>Activity Feed</h1>
          <div >
          <Post post={this.state.posts} />
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
