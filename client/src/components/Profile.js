import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import '../css/Application.css';
import '../css/Profile.css';
import Header from './Header'
import classnames from 'classnames';
import Post from '../components/Post';
import {Container, Col, Row, Nav, NavItem, NavLink, TabContent, TabPane, Form, FormGroup, Label, Input, Button, FormText} from 'reactstrap';

const defaultPic = "http://chittagongit.com//images/default-user-icon/default-user-icon-8.jpg"

export class Profile extends Component {
    constructor(props){
        super(props)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleProfileEdit = this.handleProfileEdit.bind(this)
        this.componentDidMount = this.componentDidMount.bind(this)
        this.toggle = this.toggle.bind(this);
        this.backToDefault = this.backToDefault.bind(this)

        this.state = {

            user: JSON.parse(window.sessionStorage.getItem("user")),
            activeTab: '1',
            friends: [],
            posts:[],

            //userName: 'John Smith',
            firstName: 'John',
            lastName: 'Smith',
            age: 'Not listed',
            //bio: 'Hello, this is my profile',
            picture: '',

            tmpAge:'',
            tmpBio:'',
            //tmpUserName:'',
            tmpFirstName:'',
            tmpLastName:'',
            tmpPicture:''
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
        if(this.state.user.firstName != null){
            this.setState({ firstName: this.state.user.firstName });
        }

        if(this.state.user.lastName != null){
            this.setState({ lastName: this.state.user.lastName });
        }

        /*if(this.state.user.username != null){
            this.setState({ userName: this.state.user.username });
        }*/
        
        if(this.state.user.age != null){
            this.setState({ age: this.state.user.age });
        }

        this.setState({ picture: this.state.user.photo})

        this.getFriends()
        this.getUsersPosts()
        console.log(this.state.user);
        console.log(this.state.posts);
    }

    // submits the profile changes to the server 
    handleProfileEdit() {
        var newAge = this.state.tmpAge
        var newFirstName = this.state.tmpFirstName
        var newLastName = this.state.tmpLastName
        //var newName = this.state.tmpUserName
        var newPicture = this.state.tmpPicture

        if(this.state.tmpAge === '')
            newAge = this.state.age

        if(this.state.tmpFirstName === '')
            newFirstName = this.state.firstName

        if(this.state.tmpLastName === '')
            newLastName = this.state.lastName

        /*if(this.state.tmpUserName === '')
            newName = this.state.userName*/
        
        if(this.state.tmpPicture === '')
            newPicture = this.state.picture
  
        axios.post('http://localhost:4000/api/v1/user/update',{ 
          userId: this.state.user.id,
          firstName: newFirstName,
          lastName: newLastName,
          //username: newName,
          age: newAge,
          picture: newPicture
        }).then(((response) => {
            this.profileReload()
        }))
        .catch(function (error) {
          console.log(error);
        });
    }

    // refreshes the page to get the updated profle info
    profileReload() {
        let userUri = "http://localhost:4000/api/v1/user/" + this.state.user.id
        axios.get(userUri).then((response) => {
        window.sessionStorage.setItem("user", JSON.stringify(response.data))
        this.setState({user: JSON.parse(window.sessionStorage.getItem("user"))})
        
        window.location.reload();
        })
    }

    // change picture back to default if the new picture is not valid
    backToDefault () {
        axios.post('http://localhost:4000/api/v1/user/update',{
            userId: this.state.user.id,
            picture: defaultPic
          }).then((response) => {
            this.profileReload()
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    render() {
        return (			
            <div>
                <div className="header-layout">
                    <Header />
                </div>
                <div className="application-background-primary main-container-style">
                <Container >
                    <Row >
                        <Col className="application-background-secondary container-left-column-style" md="2"  >
                            <Row className="container-left-column-first-row"><img onError={this.backToDefault} className="avatar-style" src={this.state.user.picture === null ? this.state.user.photo : this.state.user.picture} alt="logo"/></Row>
                            <Row >
                                <div >
                                <p>{this.state.firstName} {this.state.lastName}, {this.state.age}</p>
                                {/* <p>{this.state.bio}</p> */}
                                </div>
                            </Row>
                        </Col>
                        <Col className="container-right-column-style">      
                            <div className="application-background-secondary container-nav-style" >
                                <Nav tabs className="container-nav-tab-style">
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
                                            <p key={friend.user.id} className="friend-list-style">
                                                <img src={friend.user.picture === null ? defaultPic : friend.user.picture} className="friend-profile-pic-style" alt="Profile Pic" /> {friend.user.firstName} {friend.user.lastName} &nbsp;
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
                                                <Container className="containter-right-column-edit-container-style" >
                                                <Form className="form containter-right-column-edit-container-form-style">
                                                    {/*<Col>
                                                    <FormGroup>
                                                        <Label >Username</Label>
                                                        <Input
                                                            value={this.state.tmpUserName}
                                                            onChange={this.handleInputChange}
                                                            name="tmpUserName"
                                                            placeholder={this.state.tmpUserName}
                                                        />
                                                        <FormText>e.g. John Smith</FormText>
                                                    </FormGroup>
                                                    </Col>*/}
                                                    <Col>
                                                    <FormGroup>
                                                        <Label>Firstname</Label>
                                                        <Input
                                                            value={this.state.tmpFirstName}
                                                            onChange={this.handleInputChange}
                                                            name="tmpFirstName"
                                                            placeholder={this.state.tmpFirstName}
                                                        />
                                                        <FormText>e.g. John</FormText>
                                                    </FormGroup>
                                                    </Col>
                                                    <Col>
                                                    <FormGroup>
                                                        <Label>Lastname</Label>
                                                        <Input
                                                            value={this.state.tmpLastName}
                                                            onChange={this.handleInputChange}
                                                            name="tmpLastName"
                                                            placeholder={this.state.tmpLastName}
                                                        />
                                                        <FormText>e.g. Smith</FormText>
                                                    </FormGroup>
                                                    </Col>
                                                    <Col>
                                                    <FormGroup>
                                                        <Label >Age</Label>
                                                        <Input
                                                            value={this.state.tmpAge}
                                                            onChange={this.handleInputChange}
                                                            name="tmpAge"
                                                            placeholder={this.state.tmpAge}
                                                            type="number"
                                                        />
                                                        <FormText>e.g. 21</FormText>
                                                    </FormGroup>
                                                    </Col> 
                                                    <Col>
                                                    <FormGroup>
                                                        <Label >Picture (link)</Label>
                                                        <Input
                                                            value={this.state.tmpPicture}
                                                            onChange={this.handleInputChange}
                                                            name="tmpPicture"
                                                            placeholder={this.state.tmpPicture}
                                                            type="url"
                                                        />
                                                        <FormText>e.g. http://catcatcat.com/images/catbleh.jpg</FormText>
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
        </div>
        );
    
    }

}

export default Profile;