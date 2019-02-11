import React, { Component } from "react";
import Popup from "reactjs-popup";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';


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
    body : ''
    }
  };
 
  //add variable for the form text

 
  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }


  handleFormSubmit() {
    axios.post('http://localhost:4000/api/v1/post/create',{ 
    body: this.body,
    category: this.category,
    createdAt: "2019-02-08T21:05:05.000Z",
    id: 9,
    rating: null,
    title: this.title,
    updatedAt: "2019-02-08T21:05:05.000Z",
    user: {createdAt: "2019-01-27T11:47:59.000Z", email: "test", firstName: "Albert", id: 1, lastName: "Einstein",
            password: "test", updatedAt: "2019-01-27T11:48:03.000Z", username: "test"},
    userId: 9}).then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  
  
  
  }

  render(){
        return  <Popup style={{ width: '100%', height: '45%', position:'relative'}}trigger={<button className="button" style={{height:'150px', width:'150px'}} > Post </button>} modal>
           {close => (
             <div >
               <Container style={{
                position:'relative',
                textAlign: 'left',
                padding: '1em',
                border: '2px solid #d3d3d3',
                borderRadius: '.5em',
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
                          fontWeight: '600'}}>Category</Label>
                        <Input
                        value={this.state.title}
                        onChange={this.handleInputChange}
                        name="title"
                        placeholder="Title of the Movie"
                        />
                    </FormGroup>
                    </Col>
                    <Col>
                    <FormGroup>
                        <Label >Movie Category</Label>
                      <Input
                        value={this.state.category}
                        onChange={this.handleInputChange}
                        name="category"
                        placeholder="Movie Category"
                        />
                    </FormGroup>
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
                    <Button style={{height:'100px'}} onClick={this.handleFormSubmit}>Submit</Button>
                </Form>
                </Container>
                </div>
           )}
         </Popup>;
     
      }
    
}



export default PostForm;

