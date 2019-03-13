import React from 'react'
import { Switch, Route } from 'react-router-dom'
import MainPage from './MainPage';
import HomePage from './HomePage';
import Profile from './Profile';

const Routes = () => (
  <main>
    <Switch>
      <Route exact path='/' component={HomePage}/>
      <Route path='/main' component={MainPage}/>
      <Route path='/profile' component={Profile} />
    </Switch>
  </main>
)

export default Routes
