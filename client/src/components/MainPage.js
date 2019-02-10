import React, { Component } from 'react';
<<<<<<< HEAD
import Post from '../components/Post';
import '../css/Post.css';
import PostForm from './PostForm';
import '../css/Postform.css';
=======
import Header from './Header'
>>>>>>> Updated login page and implemented search bar+header bar

class MainPage extends Component {
  constructor(props) {
    super(props)

    this.updateFeed = this.updateFeed.bind(this)
  }
   
  state = {
<<<<<<< HEAD
    data :'',
    posts : [
        {
          id: 1,
          catagory: 'Action',
          contentName: 'National Treasure',
          body: 'Nick Cage is funny'
        },
        {
          id: 2,
          catagory: 'Action',
          contentName: 'Spiderman',
          body: 'I Like spiderman'
        },
        {
          id: 3,
          catagory: 'Horror',
          contentName: 'Halloween',
          body: 'It was Scary'
        }
    ]

=======
    people: [
      {
        name: "Jon",
        avatar: 1
      },
      {
        name: "Mark",
        avatar: 2
      },
      {
        name: "Log",
        avatar: 3
      },
      {
        name: "Jonathan",
        avatar: 3
      },
      {
        name: "Jumbo",
        avatar: 4
      },
      {
        name: "Lorin",
        avatar: 5
      }
    ]
>>>>>>> Updated login page and implemented search bar+header bar
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
<<<<<<< HEAD
      //load a list of posts. in the posts them self, define how they shoudl look. then have the container just display that
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
=======
      <div className="MainPage">
        <Header header={this.state.people}/>
>>>>>>> Updated login page and implemented search bar+header bar
      </div>
    );
  }
}

//button, that on click renders a popup
//so in the button, onClick method calls a render of a class


export default MainPage;
