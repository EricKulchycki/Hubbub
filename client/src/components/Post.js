import React, { Component } from 'react';
import '../css/Post.css';
import '../css/Application.css';
import Rating from 'react-rating';

const defaultPic = "http://chittagongit.com//images/default-user-icon/default-user-icon-8.jpg";


export class Post extends Component {

  constructor(props) {
    super(props)
    this.toggleHidden = this.toggleHidden.bind(this)

    this.state = {
      isHidden: this.props.post.spoiler
    };
  }


  toggleHidden () {
    this.setState({
      isHidden: false
    })
  }


  render() {
    return  (
      <div className="post-style">
    <h1 className="post-username text-left margin-none"><img src={this.props.post.user.picture === null ? defaultPic : this.props.post.user.picture} className="post-profile-pic-style" alt="Profile Pic" /> {this.props.post.user.firstName} {this.props.post.user.lastName}</h1>
    <h2 className="post-title text-left margin-none">{this.props.post.title}</h2>
		<h3 className="post-category text-left margin-none">Category: {this.props.post.category}</h3>
        <Rating readonly initialRating={this.props.post.rating} emptySymbol="fa fa-star-o fa-sm" fullSymbol="fa fa-star fa-sm"/>
        <div className="post-body">{this.state.isHidden === false ? this.props.post.body :<p style={{cursor: 'pointer'}} onClick={this.toggleHidden}>This post contains spoilers, click to show more</p>} </div > 
        <h1 style={{fontSize: '10px', textAlign: 'right'}}> {(this.props.post.createdAt).split("T",1)}</h1>
       </div>
    );
  }
}

export default Post;
