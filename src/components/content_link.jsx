import CopyToClipboard from 'react-copy-to-clipboard';
import Reflux from 'reflux';
import Reorder from 'react-reorder';
import React, { Component, PropTypes } from 'react';
import Router, { Link } from 'react-router';

import Actions from '../actions';

export default class ContentLink extends Component {
  constructor(props) {
    super(props);
    this.componentWillMount = this.componentWillMount.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.edit = this.edit.bind(this);
    this.save = this.save.bind(this);
    this.remove = this.remove.bind(this);
    this.renderDisplay = this.renderDisplay.bind(this);
    this.renderForm = this.renderForm.bind(this);
    this.render = this.render.bind(this);
    this.state = { editing: false };
  }

  componentWillMount() {
  }

  componentDidMount() {
  }

  edit() {
    this.setState({ editing: true });
  }

  save() {
    this.props.onChange(document.getElementById(`this-content-id-${this.props.index}`).value, this.props.index);
    this.setState({ editing: false });
  }

  remove() {
    this.props.onRemove(this.props.index);
  }

  renderDisplay() {
    return (<li>{this.props.testValue}
      <button onClick={this.edit}
        className="btn btn-primary glyphicon glyphicon-pencil" title="Изменить"
      />
      <button onClick={this.remove}
        className="btn btn-danger glyphicon glyphicon-trash" title="Удалить"
      />
      <CopyToClipboard text={this.props.testValue}>
        <button className="btn" type="button" title="Копировать">
          <img className="clippy" src="/images/clippy.svg" width="13" />
        </button>
      </CopyToClipboard>
    </li>);
  }

  renderForm() {
    return (<li>
      <input id={`this-content-id-${this.props.index}`} type="text" defaultValue={this.props.testValue} />
      <button onClick={this.save} className="btn btn-success btn-sm glyphicon glyphicon-floppy-disk" />
    </li>);
  }

  render() {
    if (this.state.editing) {
      return this.renderForm();
    }
    return this.renderDisplay();
  }
}

ContentLink.propTypes = {
  index: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  testValue: PropTypes.string.isRequired
};
