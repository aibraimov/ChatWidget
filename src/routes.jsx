import React from 'react'
import { Router, Route, Link, hashHistory } from 'react-router'
import Main from './components/main'
module.exports = (
  <Router history={hashHistory}>
    <Route path="/" component={Main}>
    </Route>
  </Router>
)
