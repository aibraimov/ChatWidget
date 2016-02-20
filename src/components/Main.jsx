import React, { Component, PropTypes } from 'react';

import Board from './Board';
import Header from './Header';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.content = this.content.bind(this);
    this.render = this.render.bind(this);
  }

  render() {
    return (<div>
      <Header />
      {this.content()}
    </div>);
  }

  content() {
    if (this.props.children) {
      return this.props.children;
    }
    return <Board />;
  }
}

Main.propTypes = {
  children: PropTypes.element
};
