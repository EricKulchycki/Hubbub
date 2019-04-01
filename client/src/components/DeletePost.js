import React, { Component } from 'react'
import axios from 'axios';
import { ButtonGroup, ButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons'
import '../css/DeletePost.css';

export class DeletePost extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
        dropdownOpen: false
    };
    }
  
  // opens and closes the dropdown
  toggle() {
    this.setState({
        dropdownOpen: !this.state.dropdownOpen
    });
  }

  // deletes a user's post based on the post's id
  deletePost(delPost) {
    axios.post( JSON.parse(window.sessionStorage.getItem("address")) +'/api/v1/post/delete', {
      id: delPost
    }).then(function (response) {
    })
    .catch(function (error) {
      console.log(error);
    });
    
    window.location.reload();
  }

  render() {
    return (
      <div>
        <ButtonGroup className="dropdown-group-style">
            <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} >
                <DropdownToggle className="dropdown-button-style">
                    <FontAwesomeIcon icon={faEllipsisH} size="lg" className="dropdown-pic-style" />
                </DropdownToggle>
                <DropdownMenu size="lg" className="delete-button-style">
                    <DropdownItem className="delete-container-style" onClick={() => this.deletePost(this.props.postId)}><div className="delete-text-style">Delete</div></DropdownItem>
                </DropdownMenu>
            </ButtonDropdown>
        </ButtonGroup>  
      </div>
    )
  }
}

export default DeletePost;
