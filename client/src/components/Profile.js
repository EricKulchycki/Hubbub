import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Post.css';
import axios from 'axios';
import '../css/Postform.css';
import '../css/Application.css';
import '../css/MainPage.css';
import classnames from 'classnames';
import Post from '../components/Post';
import {Container, Col, Row, Nav, NavItem, NavLink, TabContent, TabPane, Form, FormGroup, Label, Input, Button} from 'reactstrap';

class Profile extends Component {
    constructor(props){
        super(props)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleProfileEdit = this.handleProfileEdit.bind(this)
        this.componentDidMount = this.componentDidMount.bind(this)
        this.toggle = this.toggle.bind(this);

        this.state = {

            user: JSON.parse(window.sessionStorage.getItem("user")),
            activeTab: '1',
            friends: [],
            posts:[],

            userName: 'John Smith',
            age: 'Not listed',
            bio: 'Hello, this is my profile',

            tmpAge:'',
            tmpBio:'',
            tmpUserName:''
        };
    }

    // shows the currently selected tab
    toggle(tab) {
        if (this.state.activeTab !== tab) {
          this.setState({
            activeTab: tab
          });
        }
      }

      // manages changes in the profile form
      handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        
        });
      }

      // retrieve a list of user's friends
      getFriends() {
        let friendUri = "http://localhost:4000/api/v1/friend/" + this.state.user.id
        axios.get(friendUri)
        .then((response) => {
    
          if(response.data === null){
            return this.setState({ friends : []});
          }
          this.setState({ friends : response.data});   
        })
        .catch(function (error) {
          console.log(error);
        });
      }

      // retrieve posts made by the user
      getUsersPosts() {
        let reqURI = "http://localhost:4000/api/v1/posts/user/" + this.state.user.id;
        axios.get(reqURI)
        .then((response) => {
            
          if(response.data != null){
            this.setState({ posts : response.data});
          }})
          .catch(function (error) {
            console.log(error);
          });
      }
    
      componentDidMount() {
        if(this.state.user.username != null){
            this.setState({ userName: this.state.user.username });
        }
        
        if(this.state.user.age != null){
            this.setState({ age: this.state.user.age });
        }

        this.getFriends()
        this.getUsersPosts()
    }

    // submits the profile changes to the server 
    handleProfileEdit() {
        var newAge = this.state.tmpAge
        var newName = this.state.tmpUserName

        if(this.state.tmpAge === '')
            newAge = this.state.age

        if(this.state.tmpUserName === '')
            newName = this.state.userName
  
        axios.post('http://localhost:4000/api/v1/user/update',{ 
          userId: this.state.user.id,
          username: newName,
          age: newAge,
          picture: this.state.user.photo
        }).then(((response) => {
            this.profileReload()
        }))
        .catch(function (error) {
          console.log(error);
        });
    }

    // refreshes the page to get the updated profle info
    profileReload(){
        let userUri = "http://localhost:4000/api/v1/user/" + this.state.user.id
        axios.get(userUri).then((response) => {
        window.sessionStorage.setItem("user", JSON.stringify(response.data))
        this.setState({user: JSON.parse(window.sessionStorage.getItem("user"))})
        
        window.location.reload();
        })
    }

    render() {
        return (
            <div className="application-background-primary" style={{height: '100%'}}>
            <Container >
                <Row >
                    <Col className="application-background-secondary" md="2" style={{maxWidth: '300px', borderRight: '1px solid'}} >
                        <Row style={{ borderBottom: '1px solid'}}><img style={{width: '100%', height: '100%'}} src={this.state.user.picture === null ? this.state.user.photo : this.state.user.picture} alt="logo"/></Row>
                        <Row >
                            <div >
                            <p>{this.state.userName}, {this.state.age}</p>
                            <p>{this.state.bio}</p>
                            </div>
                        </Row>
                    </Col>
                    <Col style={{padding:'0px'}} >      
                        <div className="application-background-secondary" style={{height:'100%', minWidth:'300px'}}>
                            <Nav tabs style={{border:'0px'}}>
                                <NavItem>
                                    <NavLink className={classnames({ active: this.state.activeTab === '1' })} onClick={() => { this.toggle('1'); }}>
                                        Friends
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className={classnames({ active: this.state.activeTab === '2' })} onClick={() => { this.toggle('2'); }}>
                                        Posts
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className={classnames({ active: this.state.activeTab === '3' })} onClick={() => { this.toggle('3'); }}>
                                        Edit Profile
                                    </NavLink>
                                </NavItem>
                            </Nav>
                            <TabContent  activeTab={this.state.activeTab}>
                                <TabPane tabId="1">
                                    <Row>
                                    <Col sm="12" >
                                    <ul>
                                    {this.state.friends.map(friend => (
                                        <p key={friend.user.id}>
                                            {friend.user.firstName} {friend.user.lastName} &nbsp;
                                        </p>
                                        ))}
                                    </ul>
                                    </Col>
                                    </Row>
                                </TabPane>
                                <TabPane tabId="2">
                                    <Row>
                                        <Col>
                                        <div>						
                                            {this.state.posts.map(post => (
							                 <div key={post.id}>
							           	    <Post post={post} />
                                            
                                               </div>
                                             ))}
                                        </div>
                                        </Col>
                                    </Row>
                                </TabPane>
                                <TabPane tabId="3">
                                    <Row>
                                        <Col>
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
                                                    <Label >Username</Label>
                                                    <Input
                                                    value={this.state.tmpUserName}
                                                    onChange={this.handleInputChange}
                                                    name="tmpUserName"
                                                    placeholder={this.state.userName}
                                                    />
                                                </FormGroup>
                                                </Col>
                                                <Col>
                                                <FormGroup>
                                                    <Label >Age</Label>
                                                <Input
                                                    value={this.state.tmpAge}
                                                    onChange={this.handleInputChange}
                                                    name="tmpAge"
                                                    placeholder={this.state.age}
                                                >
                                                </Input>
                                                </FormGroup>
                                                </Col> 
                                                <Col>
                                                <FormGroup>
                                                    <Label>Bio</Label>
                                                    <textarea  
                                                    style ={{width: '100%'}} className= 'Body'
                                                    name="tmpBio"
                                                    value={this.state.tmpBio}
                                                    placeholder={this.state.bio}
                                                    onChange={this.handleInputChange}
                                                    >
                                                    </textarea>
                                                </FormGroup>
                                                </Col>
                                                <Button color="secondary" onClick={this.handleProfileEdit}>Save</Button>
                                            </Form>
                                            </Container>
                                        </Col>
                                    </Row>
                                </TabPane>
                            </TabContent>
                        </div>    
                    </Col>
                </Row>
            </Container>
            </div>
        );
    
    }

}

export default Profile;