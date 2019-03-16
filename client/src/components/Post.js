import React, { Component } from 'react';
import '../css/Post.css';
import '../css/Application.css';
import Rating from 'react-rating';

const defaultPic = "http://chittagongit.com//images/default-user-icon/default-user-icon-8.jpg";

export class Post extends Component {

  render() {
    return  (
      <div className="post-style">
			<h1 className="post-username text-left margin-none"><img src={this.props.post.user.picture === null ? defaultPic : this.props.post.user.picture} className="post-profile-pic-style" alt="Profile Pic" /> {this.props.post.user.firstName} {this.props.post.user.lastName}</h1>
		<h2 className="post-title text-left margin-none">{this.props.post.title}</h2>
		<h3 className="post-category text-left margin-none">Category: {this.props.post.category}</h3>
        <Rating readonly initialRating={this.props.post.rating} emptySymbol="fa fa-star-o fa-sm" fullSymbol="fa fa-star fa-sm"/>
        <p className="post-body">{this.props.post.body}</p>
       </div>
    );
  }
}

export default Post;
