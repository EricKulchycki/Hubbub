import React, { Component } from "react";
import Popup from "reactjs-popup";
import 'bootstrap/dist/css/bootstrap.min.css';


import {
    Container, Col, Form,
    FormGroup, Label, Input,
    Button,
  } from 'reactstrap';


class PostForm extends Component {

  render(){
        return  <Popup style={{ width: '100%', height: '45%', position:'relative'}}trigger={<button className="button"> Open Modal </button>} modal>
           {close => (
             <div >
               <Container style={{
                position:'relative',
                textAlign: 'left',
                padding: '1em',
                margin: '1em',
                border: '2px solid #d3d3d3',
                borderRadius: '.5em',
                verticalAlign: 'middle',
                marginLeft: 'auto',
                marginRight: 'auto',
                width: '100%',
                height:'100%'
                }} >
                <h2>Sign In</h2>
                <Form style={{padding: '1em'}} className="form">
                    <Col>
                    <FormGroup>
                        <Label style= {{    
                          display: 'flex',
                          fontWeight: '600'}}>Email</Label>
                        <Input
                        type="email"
                        name="email"
                        id="exampleEmail"
                        placeholder="myemail@email.com"
                        />
                    </FormGroup>
                    </Col>
                    <Col>
                    <FormGroup>
                        <Label for="examplePassword">Password</Label>
                        <Input
                        type="password"
                        name="password"
                        id="examplePassword"
                        placeholder="********"
                        />
                    </FormGroup>
                    </Col>
                    <Button onClick={(event) => this.props.updateFeed(event)}>Submit</Button>
                </Form>
                </Container>
                </div>
           )}
         </Popup>;
     
      }
    
}

//onClick={(event) => this.props.updateFeed(event, newArray)}



export default PostForm;

