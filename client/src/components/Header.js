import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Search from './functions/Search';
import logo from './images/alpha-h-box2.png'

export class Header extends Component {
  render() {
    return (
      <header style={headerStyle}>
      <Link to='/main'><img src={logo} style={imgStyle} alt="logo"/></Link>
      <Search ser = {this.props.header}/>
      </header>
    );
  }
}

const headerStyle = {
  background: '#FF0000',
  color: '#FFFFFF',
  padding: '9px 20px',
  overflow: 'hidden',
  position: 'relative'
}

const imgStyle = {
  maxWidth: '2%',
  maxHeight: '4%',
  overflow: 'hidden',
  borderRadius: '4px',
}

export default Header
