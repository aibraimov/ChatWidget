import Reflux from 'reflux';
import React, { Component, PropTypes } from 'react';
import Router, { Link } from 'react-router';

import Actions from '../Actions';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.render = this.render.bind(this);
  }

  render() {
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
}

Header.propTypes = {
};
