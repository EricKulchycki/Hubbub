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
      posts: []
    };
 }
   
  

  componentDidMount() {
    axios.get(`http://localhost:4000/api/v1/posts/all`)
    .then((response) => {
      this.setState({ posts : response.data});
      console.log(response);
      
    })
    .catch(function (error) {
      console.log(error);
    });
}

  //pass this function as a prop to the child "postForm" so
  // that it can have access to the parents state
  updateFeed(newArray){
    newArray = Array.from(newArray);
    //console.log(newArray)
  //Array.prototype.push.apply(newArray,  this.posts);   
  this.setState({posts: newArray})
}




  render() {
    
    return (
      //load a list of posts. in the posts them self, define how they shoudl look. then have the container just display that
     <div style={{backgroundColor: '#cc3300'}}>
       <div className="MainPage">
        <Header header={this.state.people}/></div>
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
    );
  }
}

//button, that on click renders a popup
//so in the button, onClick method calls a render of a class
//      <div className="MainPage">
//<Header header={this.state.people}/>

export default MainPage;