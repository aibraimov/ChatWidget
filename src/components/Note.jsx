import update from 'react/lib/update';
import CopyToClipboard from 'react-copy-to-clipboard';
import HTML5Backend from 'react-dnd-html5-backend';
import Reflux from 'reflux';
import React, { Component, PropTypes } from 'react';
import Router, { Link } from 'react-router';
import { DropTarget, DragDropContext } from 'react-dnd';

import Actions from '../Actions';
import Form from './Form';
import ItemTypes from './ItemTypes';

const style = {
};

const cardTarget = {
  drop() {
  }
};

@DragDropContext(HTML5Backend)
@DropTarget(ItemTypes.FORM, cardTarget, connect => ({
  connectDropTargetForm: connect.dropTarget()
}))
export default class Note extends Component {

  constructor(props) {
    super(props);
    this.moveCard = this.moveCard.bind(this);
    this.findCard = this.findCard.bind(this);
    this.componentWillMount = this.componentWillMount.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.edit = this.edit.bind(this);
    this.save = this.save.bind(this);
    this.remove = this.remove.bind(this);
    this.renderDisplay = this.renderDisplay.bind(this);
    this.renderForm = this.renderForm.bind(this);
    this.textForm = this.textForm.bind(this);
    this.nextId = this.nextId.bind(this);
    this.addForm = this.addForm.bind(this);
    this.removeForm = this.removeForm.bind(this);
    this.eachForm = this.eachForm.bind(this);
    this.render = this.render.bind(this);
    this.state = {
      editing: false,
      forms: [
        { id: 1 },
        { id: 2 },
        { id: 3 }
      ]
    };
  }

  moveCard(id, atIndex) {
    const { form, index } = this.findCard(id);
    this.setState(update(this.state, {
      forms: {
        $splice: [
          [index, 1],
          [atIndex, 0, form]
        ]
      }
    }));
  }

  findCard(id) {
    const { forms } = this.state;
    const form = forms.filter(c => c.id === id)[0];

    return {
      form,
      index: forms.indexOf(form)
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
    this.props.onChange(document.getElementById('this-note').value, this.props.id);
    this.setState({ editing: false });
  }
  remove() {
    this.props.onRemove(this.props.id);
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
  addForm() {
    const { forms } = this.state;
    forms.push({
      id: this.nextId()
    });
    this.setState({ forms });
  }
  removeForm(id) {
    const { forms } = this.state;
    const index = window.findWithAttr(forms, 'id', id);
    forms.splice(index, 1);
    this.setState({ forms });
  }
  eachForm(form) {
    return (
      <Form key={form.id}
        id={form.id}
        onChange={this.updateForm}
        onRemove={this.removeForm}
        moveCard={this.moveCard}
        findCard={this.findCard}
      />
    );
  }
  render() {
    const { connectDropTargetForm } = this.props;
    return (
      <div className="note" style={this.style}>
        {this.textForm()}

        <hr />
        <h4>Forms</h4>
        {connectDropTargetForm(
          <div>
          <ul className="content-links">
            {
              this.state.forms.map(this.eachForm, this)
            }
          </ul>
          <button className="btn btn-sm btn-success glyphicon glyphicon-plus"
            onClick={this.addForm}
          />
          </div>
        )}
      </div>);
  }
}

Note.propTypes = {
  connectDropTargetForm: PropTypes.func,
  id: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  note: PropTypes.string.isRequired
};
