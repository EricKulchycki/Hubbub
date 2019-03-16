import React, { Component } from "react";
import Popup from "reactjs-popup";
import axios from 'axios';
import Rating from 'react-rating';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Postform.css';
import {
    Container, Col, Form,
    FormGroup, Label, Input,
    Button, FormText
  } from 'reactstrap';

export class PostForm extends Component {
  constructor(props) {
    super(props)

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
   
    this.state = {
		category : '',
		title : '',
		body : '',
		isOpen: false
    }
  };
	
	// opens the popup
  handleOpen = () => {
    this.setState({ isOpen: true });
  }

	// closes the popup
  handleClose = () => {
    this.setState({ isOpen: false });
  }
 
	// manages changes in the post form
  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

	// submits the user post to the server
  handleFormSubmit() {
    axios.post('http://localhost:4000/api/v1/post/create',{ 
      title: this.state.title,
      category: this.state.category,
      body: this.state.body,
      userId: this.props.user.id,	
      rating: null
  }).then(function (response) {
    })
    .catch(function (error) {
      console.log(error);
		});
		
	this.handleClose();
  }

  render(){
        return  <Popup 
					open={this.state.isOpen}
					onOpen={this.handleOpen}
					className="popup-style"
					trigger={<Button className="post-button-style"> <div className="post-text-style">Post</div></Button>} 
					modal
				>
				{close => (					
					<Container className="container-form-style" >
						<Form className="form-style">
							<Col>
							<FormGroup>
								<Label className="form-label-style">Title</Label>
								<Input
								value={this.state.title}
								onChange={this.handleInputChange}
								name="title"
								/>
								<FormText>e.g. Avengers: Endgame</FormText>
							</FormGroup>
							</Col>
							<Col>
							<FormGroup>
								<Label className="form-label-style">Category</Label>
							<Input
								type="select"
								value={this.state.category}
								onChange={this.handleInputChange}
								name="category"
								placeholder="Category"
							>
								<option value="MOVIE">Movie</option>
								<option value="COMIC">Comic</option>
								<option value="VIDEO GAME">Video Game</option>
								<option value="TV-SHOW">Tv-Show</option>
								<option value="ANIME">Anime</option>
							</Input>
							</FormGroup>
							</Col> 
								<Col> <Label>Rating:</Label><Rating initialRating={0} emptySymbol="fa fa-star-o fa-2x" fullSymbol="fa fa-star fa-2x"/>
								</Col>
							<Col>
							<FormGroup>
								<Label className="form-label-style">Body</Label>
								<textarea  
								className="form-body-textarea-style"
								name="body"
								value={this.state.body}
								onChange={this.handleInputChange}
								>
								</textarea>
								<FormText>e.g. This movie is something I have never seen before!</FormText>
							</FormGroup>
							</Col>
							<Button color="secondary" onClick={this.handleFormSubmit}>Submit</Button>
						</Form>
						</Container>						
				)}
			</Popup>
     
      } 
}

export default PostForm;