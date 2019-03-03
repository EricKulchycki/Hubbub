import React, { Component } from 'react';
import Routes from './components/Routes'

class App extends Component {
  state = {
    data: ''
  }
render() {
  return (
  <div>
    <Routes />
  </div>
  );
}
}

export default App;
