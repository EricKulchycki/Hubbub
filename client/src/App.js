import React, { Component } from 'react';
import Routes from './components/Routes'
import Header from './components/Header'

class App extends Component {
  state = {
    data: ''
  }
render() {
  return (
  <div>
	<Header />
    <Routes />
  </div>
  );
}
}

export default App;
