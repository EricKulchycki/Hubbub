import React, { Component } from 'react';
import Header from './Header'
import Post from '../components/Post';
import PostForm from './PostForm';
import '../css/Postform.css';
import axios from 'axios';

class MainPage extends Component {
  constructor(props) {
    super(props)

    this.componentDidMount = this.componentDidMount.bind(this)
    this.updateFeed = this.updateFeed.bind(this)
    this.state = {
      
      posts: [{user:{username: 'Steve'},title: 'Spiderman',category: 'Movie',body:'I liked this movie '}],
      people: []
    };
 }
  
  componentDidMount() {
    axios.get(`http://localhost:4000/api/v1/post/cat:MOVIE`)
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
    axios.post(`http://localhost:4000/api/v1/user/list`, {
      firstName: firstName
  })
    .then(res => this.setState({ people: res.data}));
    }

  render() {
    
    return (
      //load a list of posts. in the posts them self, define how they shoudl look. then have the container just display that
     <div>
     <div className="MainPage">
      <Header header={this.state.people} searchUsers={this.searchUsers}/>
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
