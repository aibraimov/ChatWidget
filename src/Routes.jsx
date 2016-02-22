import React from 'react';
import { Router, Route, hashHistory } from 'react-router';

import Main from './components/Main';

const Routes = (
  <Router history={hashHistory}>
    <Route path="/" component={Main} />
  </Router>
);

export default Routes;
