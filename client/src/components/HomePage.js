import React, { Component } from 'react';
import io from 'socket.io-client'
import OAuth from '../authentication/OAuth'
import { API_URL } from '../authentication/config'
import axios from 'axios';
import logo from './images/hubbub_logo.png';
import '../css/Home.css';
const socket = io(API_URL)

export class HomePage extends Component {
  state = {
    data: ''
  }
  componentDidMount = () => {
    axios.get(`http://localhost:4000/sayHello`)
    .then(res => {
      const dataFromServer = res.data;
      this.setState({ data: dataFromServer });
    });
  }
  
  render() {
    return (
      <div className="login">
        <div >
          <div >
          <p className="p-style" >Login</p>
          <OAuth provider={'google'} key={'google'}	socket={socket}/>
          </div>
          <div><img src={logo} className="img-style" alt="logo" /></div>
          <p className="desc-style">Your friends share your taste. Keep up with the real critics.</p>
        </div>
      </div>
    );
  }
}

export default HomePage;
