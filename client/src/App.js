import React from 'react';
import ReactDOM from'react-dom';
import {Login} from './route/Login';
import {Feeds} from './route/Feeds';
import {Friends} from './route/Friends';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
                <Router>
                    <Switch>
                        <Route exact path='/login' component={Login} />
                        <Route exact path = "/feeds" component = {Feeds} />
                        <Route exact path = "/friends" component = {Friends} />
                    </Switch>
                </Router>
  );
}

export default App;
