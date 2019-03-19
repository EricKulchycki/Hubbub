import React, { Component } from 'react';
import '../css/Post.css';
import '../css/Application.css';
import Rating from 'react-rating';

class Post extends Component {

  render() {
    return  (
      <div className="post-style">
		<hr></hr>
		<h1 className="post-username text-left margin-none">{this.props.post.user.firstName} {this.props.post.user.lastName}</h1>
		<h2 className="post-title text-left margin-none">{this.props.post.title}</h2>
		<h3 className="post-category text-left margin-none">Category: {this.props.post.category}</h3>
        <Rating readonly initialRating={this.props.post.rating} emptySymbol="fa fa-star-o fa-sm" fullSymbol="fa fa-star fa-sm"/>
        <p className="post-body">{this.props.post.body}</p>
       </div>
    );
  }
}

export default Post;
