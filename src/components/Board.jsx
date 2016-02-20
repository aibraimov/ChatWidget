import Reflux from 'reflux';
import React, { Component, PropTypes } from 'react';

import Actions from '../Actions';
import Note from './Note';
import NoteStore from '../stores/NoteStore';

export default class Board extends Component {
  constructor(props) {
    super(props);
    this.nextId = this.nextId.bind(this);
    this.componentWillMount = this.componentWillMount.bind(this);
    this.add = this.add.bind(this);
    this.update = this.update.bind(this);
    this.remove = this.remove.bind(this);
    this.eachNote = this.eachNote.bind(this);
    this.render = this.render.bind(this);
    this.onChange = this.onChange.bind(this);
    this.state = {
      notes: []
    };
  }
  nextId() {
    this.uniqueId = this.uniqueId || 0;
    return this.uniqueId++;
  }

  componentWillMount() {
//    Actions.getNotes();
  }

  add() {
    const text = 'New Note';
    const { notes } = this.state;
    notes.push({
      id: this.nextId(),
      note: text
    });
    this.setState({ notes });
  }

  update(newText, i) {
    const { notes } = this.state;
    notes[i].note = newText;
    this.setState({ notes });
  }

  remove(i) {
    const { notes } = this.state;
    notes.splice(i, 1);
    this.setState({ notes });
  }

  eachNote(note, i) {
    return (
      <Note key={note.id}
        index={i}
        note={note.note}
        onChange={this.update}
        onRemove={this.remove}
      />
    );
  }

  render() {
    return (
      <div className="board">
        {this.state.notes.map(this.eachNote)}
        <button className="btn btn-sm btn-success glyphicon glyphicon-plus"
          onClick={this.add}
        />
      </div>
    );
  }

  onChange(event, notes) {
    this.setState({ notes });
  }
}

Board.propTypes = {
};
