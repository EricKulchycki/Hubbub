import React, { Component } from "react";
import Popup from "reactjs-popup";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Rating from 'react-rating';

import {
    Container, Col, Form,
    FormGroup, Label, Input,
    Button,
  } from 'reactstrap';




class PostForm extends Component {
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
  
  handleOpen = () => {
    this.setState({ isOpen: true });
  }

  handleClose = () => {
    this.setState({ isOpen: false });
  }
 
 
  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    
    });
  }

  handleFormSubmit() {

    //console.log(this.state.title)
    //console.log(this.state.category)
    //console.log(this.state.body)

    axios.post('http://localhost:4000/api/v1/post/create',{ 
      title: this.state.title,
      category: this.state.category,
      body: this.state.body,
      userId: this.props.user.id,					///change to get the user id
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
					style={{ width: '100%', height: '45%', position:'relative'}}
					trigger={<Button > Post </Button>} 
					modal
				>
				{close => (
					
					<Container style={{
						position:'relative',
						textAlign: 'left',
						padding: '1em',
						verticalAlign: 'middle',
						marginLeft: 'auto',
						marginRight: 'auto',
						width: '100%',
						height:'100%'
						}} >
						<Form style={{padding: '1em'}} className="form">
							<Col>
							<FormGroup>
								<Label style= {{    
								display: 'flex',
								fontWeight: '600'}}>Title</Label>
								<Input
								value={this.state.title}
								onChange={this.handleInputChange}
								name="title"
								placeholder="Title"
								/>
							</FormGroup>
							</Col>
							<Col>
							<FormGroup>
								<Label >Category</Label>
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
								<Label style= {{    
								display: 'flex',
								fontWeight: '600'}}>Body</Label>
								<textarea  
								style ={{width: '100%'}} className= 'Body'
								name="body"
								value={this.state.body}
								onChange={this.handleInputChange}
								>
								</textarea>
							</FormGroup>
							</Col>
							<Button color="secondary" onClick={this.handleFormSubmit}>Submit</Button>
						</Form>
						</Container>
						
				)}
			</Popup>;
     
      }
    
}



export default PostForm;

