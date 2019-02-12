import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Search from './functions/Search';
import logo from './images/alpha-h-box2.png'

// contains components inside the header bar including logo button and searh bar
export class Header extends Component {
  render() {
    return (
      <header style={headerStyle}>
      <Link to='/main'><img src={logo} style={imgStyle} alt="logo"/></Link> {/* refreshes the main page*/}
      <Search ser={this.props.header} searchUsers={this.props.searchUsers}/>  
      </header>
    );
  }
}

const headerStyle = {
  background: '#FF0000',
  color: '#FFFFFF',
  padding: '9px 20px',
  position: 'relative'
}

const imgStyle = {
  maxWidth: '2%',
  maxHeight: '4%',
  overflow: 'hidden',
  borderRadius: '4px',
}

export default Header
