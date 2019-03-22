import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { API_URL } from './config'
import {withRouter} from 'react-router';
import '../css/OAuth.css';
import googleIcon from '../components/images/200px-Google__G__Logo.svg.png';

class OAuth extends Component {
  
  state = {
    user: {},
    disabled: ''
  }  

  componentDidMount() {
    const { socket, provider } = this.props
    socket.on(provider, user => {
		if(this.popup) {
			this.popup.close()
      window.sessionStorage.setItem("user", JSON.stringify(user))
      this.props.history.push({
        pathname: '/main',
      });
		}
    })
  }

  componentWillUnmount() {
    this.setState = (state,callback)=>{
      return;
    };
  }

  // checks if the popup is open
  checkPopup() {
    const check = setInterval(() => {
      const { popup } = this
      if (!popup || popup.closed || popup.closed === undefined) {
        clearInterval(check)
        this.setState({ disabled: ''})
      }
    }, 1000)
  }

  // opens the popup
  openPopup() {
    const { provider, socket } = this.props
    const width = 600, height = 600
    const left = (window.innerWidth / 2) - (width / 2)
    const top = (window.innerHeight / 2) - (height / 2)
    const url = `${API_URL}/${provider}?socketId=${socket.id}`

    return window.open(url, '',       
      `toolbar=no, location=no, directories=no, status=no, menubar=no, 
      scrollbars=no, resizable=no, copyhistory=no, width=${width}, 
      height=${height}, top=${top}, left=${left}`
    )
  }

  // initiate the authorization/login process
  startAuth = () => {
    if (!this.state.disabled) {
      this.popup = this.openPopup()  
      this.checkPopup()
      this.setState({disabled: 'disabled'})
    }
  }

  render() {
    const { provider } = this.props
    const { disabled } = this.state
    
    return (
          <div className='button-wrapper'>
              <button className={`${provider} ${disabled} google-button-style`} onClick={this.startAuth}>
                <img className="google-style" src={googleIcon} alt="Google Icon"></img>
                <div className="google-text-style">Google</div>
              </button>
          </div>
    )
  }
}

OAuth.propTypes = {
  provider: PropTypes.string.isRequired,
  socket: PropTypes.object.isRequired
}

export default withRouter(OAuth);