'use strict';

import React from 'react';
import Reflux from 'reflux';
import Router, { Link } from 'react-router';

import Actions from '../actions';

module.exports = React.createClass({
  render: function() {
    return (<nav className="navbar navbar-default header">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          ChatBot Creator
        </Link>
        <ul className="nav navbar-nav navbar-right">
        </ul>
      </div>
    </nav>);
  }
});
