import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import logo from './images/alpha-h-box2.png'
import '../css/Header.css';
import '../css/Application.css';

// contains components inside the header bar including logo button and searh bar
export class Header extends Component {
  render() {
    return (
      <header className="background-primary text-white header-layout">
		<Link to='/main'>
			<img src={logo} className="logo-style" alt="logo"/>
		</Link>
      </header>
    );
  }
}

export default Header
