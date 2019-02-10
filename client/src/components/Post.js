import React, { Component } from 'react';
import '../css/Post.css';

class Post extends Component {
  getStyle = () => {
    return {
      padding: '5px',
      border: '3px solid #ffffff'
     
    }
  }

  render() {
    return this.props.post.map((i)  => (
      <div style={this.getStyle()}>
      <h2 className="Title" style={{fontSize:'16px', textAlign: 'left', margin: '0%'}}>{i.contentName} </h2>
       <h3 className="Genre" style={{fontSize:'13px', textAlign: 'left', margin: '0%'}} >Catagory: {i.catagory}</h3>
        <p className="TextBody" style={{fontSize:'13px'}} >{i.body}</p>
        </div>
    ));
  }
}

export default Post;
