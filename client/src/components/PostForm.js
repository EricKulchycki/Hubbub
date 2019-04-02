import React, { Component } from "react";
import Popup from "reactjs-popup";
import axios from 'axios';
import Rating from 'react-rating';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Postform.css';
import {Container, Col, Form, FormGroup, Label, Input, Button, FormText	} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MAX_TITLE_LENGTH = "256";
const MAX_BODY_LENGTH = "4096";

export class PostForm extends Component {
    constructor(props) {
        super(props)

        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleFormSubmit = this.handleFormSubmit.bind(this)
        this.toggleSpoiler = this.toggleSpoiler.bind(this)

        this.state = {
            user: JSON.parse(window.sessionStorage.getItem("user")),
            category: 'MOVIE',
            title: '',
            body: '',
            rating: 0,
            spoiler: false,
            isOpen: false
        }
    };

    // opens the popup
    handleOpen = () => {
        this.setState({
            isOpen: true
        });
    }

    // closes the popup
    handleClose = () => {
        this.setState({
            isOpen: false
        });
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

    // sets the spoiler to true
    toggleSpoiler() {
        this.setState({
            spoiler: !this.state.spoiler
        });
    }

    // submits the user post to the server
    handleFormSubmit() {
        toast.dismiss();
        var errors = 0;

        if (!this.state.title || this.state.title.length === 0) {
            toast.error("Post is missing a title!", {
                position: toast.POSITION.TOP_CENTER
            });
            errors++;
        }

        if (!this.state.body || this.state.body.length === 0) {
            this.state.body = " ";
        }

        if (this.state.title.length > MAX_TITLE_LENGTH) {
            toast.error("Post title is too long! Try a shorter title.", {
                position: toast.POSITION.TOP_CENTER
            });
            errors++;
        }

        if (this.state.body.length > MAX_BODY_LENGTH) {
            toast.error("Post body is too long! Try a shorter body.", {
                position: toast.POSITION.TOP_CENTER
            });
            errors++;
        }

        if (errors > 0) {
            return;
        }

        axios.post(JSON.parse(window.sessionStorage.getItem("address")) + '/api/v1/post/create', {
                title: this.state.title,
                category: this.state.category,
                body: this.state.body,
                userId: this.state.user.id,
                spoiler: this.state.spoiler,
                rating: this.state.rating
            }).then(function(response) {
                toast.success("Post has been created!", {
                    position: toast.POSITION.TOP_CENTER
                });
            })
            .catch(function(error) {
                console.log(error);
            });

        this.handleClose();
    }

  render(){
        return  <Popup open={this.state.isOpen} onOpen={this.handleOpen} className="popup-style"trigger={	
				<Button className="post-button-style"> <div className="post-text-style">Post  <FontAwesomeIcon icon={faPen} size="xs"/></div></Button>} modal>
				{close => (					
					<Container className="container-form-style" >
						<Form className="form-style">
							<Col>
								<FormGroup>
									<Label className="form-label-style">Title</Label>
									<Input value={this.state.title} onChange={this.handleInputChange}	name="title"/>
									<FormText>e.g. Avengers: Endgame</FormText>
								</FormGroup>
							</Col>
							<Col>
								<FormGroup>
									<Label className="form-label-style">Category</Label>
									<Input type="select" value={this.state.category} onChange={this.handleInputChange} name="category" placeholder="Category" >
										<option value="MOVIE">Movie</option>
										<option value="COMIC">Comic</option>
										<option value="VIDEO GAME">Video Game</option>
										<option value="TV-SHOW">Tv-Show</option>
										<option value="ANIME">Anime</option>
									</Input>
								</FormGroup>
							</Col> 
								<Col> 
									<Label>Rating:</Label><Rating initialRating={this.state.rating}  onChange={(value) => this.setState({rating: value})} emptySymbol="fa fa-star-o fa-2x" fullSymbol="fa fa-star fa-2x"/>
								</Col>
								<Col>
									<FormGroup >
										<Label className="postform-checkbox" >
											<Input onChange={this.toggleSpoiler} type="checkbox" /> Contains Spoilers?
										</Label>
									</FormGroup>
								</Col>
							<Col>
								<FormGroup>
									<Label className="form-label-style">Body</Label>
									<textarea className="form-body-textarea-style" name="body" value={this.state.body} onChange={this.handleInputChange}></textarea>
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