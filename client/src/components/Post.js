import React, { Component } from 'react';
import '../css/Post.css';
import '../css/Application.css';

class Post extends Component {

  render() {
    return  (
      <div className="post-style">
		<hr></hr>
		<h1 className="post-username text-left margin-none">{this.props.post.user.firstName} {this.props.post.user.lastName}</h1>
		<h2 className="post-title text-left margin-none">{this.props.post.title}</h2>
		<h3 className="post-category text-left margin-none">Category: {this.props.post.category}</h3>
        <p className="post-body">{this.props.post.body}</p>
       </div>
    );
  }
}

export default Post;
