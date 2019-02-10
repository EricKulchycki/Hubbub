import React, { Component } from 'react'

export class Search extends Component {
  state = {
      query: '',
      result: [],
  }

  enterPress(event) {
     event.preventDefault();
  }

  handleInput = () => {
      this.setState({
          query: this.search.value
      }, () => {
          let tempList = [];
          let newList = [];
        
          if (this.state.query && this.state.query.length > 1) {
              tempList = this.props.ser;
              newList = tempList.filter(data => {
                  const dataLower = data.name.toLowerCase();
                  const queryLower = this.state.query.toLowerCase();
                  return dataLower.includes(queryLower);
              });
              
          }else {
             newList = [];
          }

          this.setState({
              result: newList
          })
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
            <datalist id="people" >
                {this.state.result.map((res) =>
                    <option value={res.name}/>
                    )}
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
