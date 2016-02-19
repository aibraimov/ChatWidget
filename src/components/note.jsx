import CopyToClipboard from 'react-copy-to-clipboard';
import ReactDOM from 'react-dom';
import Reflux from 'reflux';
import React, { Component, PropTypes } from 'react';
import Router, { Link } from 'react-router';

import Actions from '../actions';
import ContentLink from './content_link';

export default class Note extends Component {

  constructor(props) {
    super(props);
    this.componentWillMount = this.componentWillMount.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.edit = this.edit.bind(this);
    this.save = this.save.bind(this);
    this.remove = this.remove.bind(this);
    this.renderDisplay = this.renderDisplay.bind(this);
    this.renderForm = this.renderForm.bind(this);
    this.textForm = this.textForm.bind(this);
    this.nextId = this.nextId.bind(this);
    this.addContentLink = this.addContentLink.bind(this);
    this.removeContentLink = this.removeContentLink.bind(this);
    this.updateContentLink = this.updateContentLink.bind(this);
    this.eachContentLink = this.eachContentLink.bind(this);
    this.contentLinks = this.contentLinks.bind(this);
    this.render = this.render.bind(this);
    this.state = {
      editing: false, contentLinks:
      [
        { id: 1, test_value: 'a', content_type: 0 },
        { id: 2, test_value: 'b', content_type: 1 },
        { id: 3, test_value: 'c', content_type: 2 }
      ]
    };
  }
  componentWillMount() {
  }
  componentDidMount() {
    this.uniqueId = 4;
  }
  edit() {
    this.setState({ editing: true });
  }
  save() {
    this.props.onChange(document.getElementById('this-note').value, this.props.index);
    this.setState({ editing: false });
  }
  remove() {
    this.props.onRemove(this.props.index);
  }
  renderDisplay() {
    return (
      <div className="p-main">
        <span className="p-main-buttons">
            <button onClick={this.edit}
              className="btn btn-primary glyphicon glyphicon-pencil" title="Изменить"
            />
            <button onClick={this.remove}
              className="btn btn-danger glyphicon glyphicon-trash" title="Удалить"
            />
          <CopyToClipboard text={this.props.note}>
              <button className="btn" type="button" title="Копировать">
                  <img className="clippy" src="/images/clippy.svg" width="13" />
              </button>
            </CopyToClipboard>
        </span>
        <p className="p-main-question">
          {this.props.note}
        </p>
      </div>
    );
  }
  renderForm() {
    return (
      <div className="p-main">
        <span className="p-main-buttons">
          <button onClick={this.save} className="btn btn-success btn-sm glyphicon glyphicon-floppy-disk" />
        </span>
        <textarea id="this-note" defaultValue={this.props.note} className="form-control main-question"></textarea>
      </div>
    );
  }
  textForm() {
    if (this.state.editing) {
      return this.renderForm();
    }
    return this.renderDisplay();
  }
  nextId() {
    this.uniqueId = this.uniqueId || 0;
    return this.uniqueId++;
  }
  addContentLink(event) {
    const type = parseInt(event.target.getAttribute('data-type'));
    const text = 'New content link';
    const { contentLinks } = this.state;
    contentLinks.push({
      id: this.nextId(),
      test_value: text,
      content_type: type
    });
    this.setState({ contentLinks: contentLinks });
  }
  removeContentLink(id) {
    const { contentLinks } = this.state;
    const index = window.findWithAttr(contentLinks, 'id', id);
    contentLinks.splice(index, 1);
    this.setState({ contentLinks });
  }
  updateContentLink(newText, id) {
    const { contentLinks } = this.state;
    const index = window.findWithAttr(contentLinks, 'id', id);
    contentLinks[index].test_value = newText;
    this.setState({ contentLinks });
  }
  eachContentLink(contentLink) {
    return (
      <ContentLink key={contentLink.id}
        index={contentLink.id}
        onChange={this.updateContentLink}
        onRemove={this.removeContentLink}
        testValue={contentLink.test_value}
        contentType={contentLink.content_type}
      />
    );
  }
  contentLinks(type) {
    return (
      <div>
      <ul className="content-links">
        {
          this.state.contentLinks.filter((x) => { return x.content_type === type; })
          .map(this.eachContentLink, this)
        }
      </ul>
      <button className="btn btn-sm btn-success glyphicon glyphicon-plus"
        onClick={this.addContentLink} data-type={type}
      />
      </div>
    );
  }
  render() {
    return (<div className="note" style={this.style}>
    {this.textForm()}

    <hr />
    <h4>Links</h4>
    {this.contentLinks(0)}

    <hr />
    <h4>Iputs</h4>
    {this.contentLinks(1)}

    <hr />
    <h4>Textareas</h4>
    {this.contentLinks(2)}
  </div>);
  }
}

Note.propTypes = {
  index: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  note: PropTypes.string.isRequired
};
