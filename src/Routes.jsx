import React from 'react';
import { Router, Route, hashHistory } from 'react-router';

import Main from './components/Main';

module.exports = (
  <Router history={hashHistory}>
    <Route path="/" component={Main} />
  </Router>
);
