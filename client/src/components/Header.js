import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import logo from './images/alpha-h-box2.png'
import '../css/Header.css';
import '../css/Application.css';
import Search from './Search';

// contains components inside the header bar including logo button and searh bar
export class Header extends Component {
  render() {
    return (
      <header className="background-primary header-layout">
		<Link to='/main'>
			<img src={logo} className="logo-style" alt="logo"/>
		</Link>
    <Search ser={this.props.header} user={this.props.user} searchUsers={this.props.searchUsers} checkFriend={this.props.checkFriend}
        addFriend={this.props.addFriend} deleteFriend={this.props.deleteFriend}/>
    <div className="greet-style">Wassup {this.props.user.firstName}!</div> 
      </header>
    );
  }
}

export default Header
