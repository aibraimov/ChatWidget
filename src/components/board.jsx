'use strict';
import React from 'react';
import Reflux from 'reflux';
import Actions from '../actions';
import NoteStore from '../stores/note-store';
import ReactRouter from 'react-router';
import Note from './note';
const {State, Link} = ReactRouter;

module.exports = React.createClass({
  mixins: [
    Reflux.listenTo(NoteStore, 'onChange')
  ],
  getInitialState: function() {
    return {
      notes: []
    };
  },
  nextId: function() {
      this.uniqueId = this.uniqueId || 0;
      return this.uniqueId++;
  },
  componentWillMount: function() {
//    Actions.getNotes();
  },
  add: function(text) {
      var arr = this.state.notes;
      arr.push({
          id: this.nextId(),
          note: text
      });
      this.setState({notes: arr});
  },
  update: function(newText, i) {
      var arr = this.state.notes;
      arr[i].note = newText;
      this.setState({notes:arr});
  },
  remove: function(i) {
      var arr = this.state.notes;
      arr.splice(i, 1);
      this.setState({notes: arr});
  },
  eachNote: function(note, i) {
      return (
              <Note key={note.id}
                  index={i}
                  onChange={this.update}
                  onRemove={this.remove}
              >{note.note}</Note>
          );
  },
  render: function() {
      return (<div className="board">
                  {this.state.notes.map(this.eachNote)}
                  <button className="btn btn-sm btn-success glyphicon glyphicon-plus"
                          onClick={this.add.bind(null, "New Note")}/>

          </div>

      );
  },
  onChange: function(event, notes) {
    this.setState({notes: notes});
  }
});
