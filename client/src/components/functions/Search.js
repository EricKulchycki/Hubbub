import React, { Component } from 'react'

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
                style={searchStyle}                
            />
            <datalist id="people" > {/*diplay user suggestions */}
                {this.props.ser.map((res) => (
                    <React.Fragment>
                    <option value={res.firstName}/>                    
                    </React.Fragment>
                ))}
            </datalist>     
        </form>
    )
  }
}

const searchStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    float: 'none',
    width: '450px'
}

export default Search
