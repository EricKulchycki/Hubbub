import React, { Component } from 'react';
import io from 'socket.io-client'
import OAuth from '../authentication/OAuth'
import { API_URL } from '../authentication/config'
import axios from 'axios';
import logo from './images/hubbub_logo.png';
import '../css/Home.css';
const socket = io(API_URL)
const providers = ['google']

export class HomePage extends Component {
  state = {
    data: ''
  }
  componentDidMount = () => {
    // Make sure to change the (localhost) on the line bellow 
    // to the public DNS of your EC2 instance
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
          <div style={{height:'79%'}}><img src={logo} className="img-style" alt="logo" /></div>
          <p className="desc-style">Your friends share your taste. Keep up with the real critics.</p>
        </div>
      </div>
    );
  }
}

export default HomePage;
