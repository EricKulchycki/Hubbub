import React, { Component } from 'react'
import AddDeleteFriend from './AddDeleteFriend';
import '../css/Search.css';

const defaultPic = "https://academist-app-production.s3.amazonaws.com/uploads/user/profile_image/8823/default_user_icon.png";

export class Search extends Component {
	state = {
		query: '',
	}

	// prevents user from entering search
	enterPress(event) {
		event.preventDefault();
	}

	// retrieve user input that will be used to query the database
	handleInput = () => {
		this.setState({
			query: this.search.value
		}, () => {
			return this.props.searchUsers(this.state.query);
		})
	}
	
	render() {
		return (
			<form onSubmit={this.enterPress}>
				<input
					placeholder="Search"
					ref={input => this.search = input}
					onChange={this.handleInput}
					list="people"
					className="search-style"                
				/>
				<div className="div-style">
					<ul className="ulist-style"> {/*display user suggestions */}
						{this.props.ser.map((res) => (
							<React.Fragment key={res.id}>
							<li key={res.id} className="list-style"><img src={res.picture === null ? defaultPic : res.picture} className="display-pic-style" alt="Profile Pic" /> {res.firstName} {res.lastName}
							<AddDeleteFriend friend={res} user={this.props.user} checkFriend={this.props.checkFriend} 
							addFriend={this.props.addFriend} deleteFriend={this.props.deleteFriend}/>
							</li>                  
							</React.Fragment>
						))}
					</ul>
				</div>     
			</form>
		)
	}
}

export default Search
