import React from 'react'
import { Switch, Route } from 'react-router-dom'
import MainPage from './MainPage';
import HomePage from './HomePage';

const Routes = () => (
  <main>
    <Switch>
      <Route exact path='/' component={HomePage}/>
      <Route path='/main' component={MainPage}/>
    </Switch>
  </main>
)

export default Routes
