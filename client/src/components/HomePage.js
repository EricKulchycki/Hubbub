import React, { Component } from 'react';
import io from 'socket.io-client'
import OAuth from '../authentication/OAuth'
import { API_URL } from '../authentication/config'
import axios from 'axios';
import logo from './images/alpha-h-box.png';
import '../css/Home.css';
const socket = io(API_URL)
//const providers = ['twitter', 'google', 'facebook', 'github']
const providers = ['google']

class HomePage extends Component {
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
          <p style={pStyle}>Login</p>
          <img src={logo} style={imgStyle} alt="logo" />
		  {providers.map(provider => 
			<OAuth 
				provider={provider}
				key={provider}
				socket={socket}
			/>
       )}
          <p style={pStyle}>Your friends share your taste. Keep up with the real critics.</p>
          
          
        </div>
      </div>
    );
  }
}

const pStyle = {
  textAlign: 'right',
  marginRight: '20%',
  color: 'white'
}

const imgStyle = {
  marginLeft: '10%',
  marginTop: '10%',
  width: '25%',
  height: '25%',
  float: 'left'
}



export default HomePage;
