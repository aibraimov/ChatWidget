'use strict';

import React from 'react';
import { Router, Route, Link, hashHistory } from 'react-router';

import Container from './dnds/Container';
import Main from './components/main';

module.exports = (
  <Router history={hashHistory}>
    <Route path="/" component={Main}>
    </Route>
    <Route path="/dnds" component={Container}>
    </Route>
  </Router>
);
