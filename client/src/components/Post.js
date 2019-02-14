import React, { Component } from 'react';

class Post extends Component {
  getStyle = () => {
    return {
      padding: '5px',
      border: '3px solid #ffffff'
     
    }
  }

  render() {
    return  (
      <div style={this.getStyle()}>
      <h1 style={{fontSize:'16px', textAlign: 'left', margin: '0%'}}> {this.props.post.user.username} </h1>
      <h2  style={{fontSize:'13px', textAlign: 'left', margin: '0%'}}>{this.props.post.title} </h2>
       <h3  style={{fontSize:'12px', textAlign: 'left', margin: '0%'}} >Category: {this.props.post.category}</h3>
        <p  style={{fontSize:'12px'}} >{this.props.post.body}</p>
        </div>
    );
  }
}

export default Post;
