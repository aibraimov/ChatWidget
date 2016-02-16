'use strict';

import React from 'react';

import Board from './board';
import Header from './header';

module.exports = React.createClass({
  render: function() {
    return (<div>
      <Header />
      {this.content()}
    </div>);
  },
  content: function() {
    if(this.props.children) {
      return this.props.children;
    } else {
      return <Board />;
    }
  }
});
