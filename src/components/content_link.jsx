'use strict';

import CopyToClipboard from 'react-copy-to-clipboard';
import React from 'react';
import Reflux from 'reflux';
import Reorder from 'react-reorder';
import Router, { Link } from 'react-router';

import Actions from '../actions';

module.exports = React.createClass({
    getInitialState: function() {
        return {editing: false};
    },
    componentWillMount: function() {
    },
    componentDidMount: function(){
    },
    edit: function() {
        this.setState({editing: true});
    },
    save: function() {
        this.props.onChange(this.refs.newText.getDOMNode().value, this.props.index);
        this.setState({editing: false});
    },
    remove: function() {
        this.props.onRemove(this.props.index);
    },
    renderDisplay: function() {
        return (<li>{this.props.testValue}
          <button onClick={this.edit}
                  className="btn btn-primary glyphicon glyphicon-pencil" title="Изменить"/>
          <button onClick={this.remove}
                  className="btn btn-danger glyphicon glyphicon-trash" title="Удалить"/>
          <CopyToClipboard text={this.props.testValue}>
            <button className="btn" type="button" title="Копировать">
                <img className="clippy" src="/images/clippy.svg" width="13" />
            </button>
          </CopyToClipboard>
        </li>);
    },
    renderForm: function() {
        return (<li>
          <input ref="newText" type="text" defaultValue={this.props.testValue} />
          <button onClick={this.save} className="btn btn-success btn-sm glyphicon glyphicon-floppy-disk" />
        </li>);
    },
    render: function() {
      if (this.state.editing) {
        return this.renderForm();
      }
      else {
        return this.renderDisplay();
      }
    }
});
