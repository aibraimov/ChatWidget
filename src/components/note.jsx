var React = require('react');
var Reflux = require('reflux');
var Actions = require('../actions');
var ReactRouter = require('react-router');
var ContentLink = require('./content_link');
import CopyToClipboard from 'react-copy-to-clipboard';
var Link = ReactRouter.Link;

module.exports = React.createClass({
    getInitialState: function() {
        return {editing: false, contentLinks:
          [{id: 1, test_value: "a", content_type: 0},
           {id: 2, test_value: "b", content_type: 1},
           {id: 3, test_value: "c", content_type: 2}]
      };
    },
    componentWillMount: function() {
    },
    componentDidMount: function(){
      this.uniqueId = 4;
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
        return (
          <div className="p-main">
            <span className="p-main-buttons">
                <button onClick={this.edit}
                        className="btn btn-primary glyphicon glyphicon-pencil" title="Изменить"/>
                <button onClick={this.remove}
                        className="btn btn-danger glyphicon glyphicon-trash" title="Удалить"/>
                <CopyToClipboard text={this.props.children}>
                  <button className="btn" type="button" title="Копировать">
                      <img className="clippy" src="/images/clippy.svg" width="13" />
                  </button>
                </CopyToClipboard>
            </span>
            <p className="p-main-question">
              {this.props.children}
            </p>
          </div>
            );
    },
    renderForm: function() {
        return (
          <div className="p-main">
            <span className="p-main-buttons">
              <button onClick={this.save} className="btn btn-success btn-sm glyphicon glyphicon-floppy-disk" />
            </span>
            <textarea ref="newText" defaultValue={this.props.children} className="form-control main-question"></textarea>
          </div>
        );
    },
    textForm: function() {
      if (this.state.editing) {
        return this.renderForm();
      }
      else {
        return this.renderDisplay();
      }
    },
    nextId: function() {
        this.uniqueId = this.uniqueId || 0;
        return this.uniqueId++;
    },
    addContentLink: function(text, type) {
        var arr = this.state.contentLinks;
        arr.push({
            id: this.nextId(),
            test_value: text,
            content_type: type
        });
        this.setState({contentLinks: arr});
    },
    removeContentLink: function(id) {
      var arr = this.state.contentLinks;
      var index = window.findWithAttr(arr, 'id', id);
      arr.splice(index, 1);
      this.setState({contentLinks: arr});
    },
    updateContentLink: function(newText, id) {
     var arr = this.state.contentLinks;
     var index = window.findWithAttr(arr, 'id', id);
     arr[index].test_value = newText;
     this.setState({contentLinks: arr});
    },
    eachContentLink: function(contentLink, i, type) {
      return (
        <ContentLink key={contentLink.id}
            index={contentLink.id}
            onChange={this.updateContentLink}
            onRemove={this.removeContentLink}
            testValue={contentLink.test_value}
            contentType={contentLink.content_type}
        ></ContentLink>
      );
    },
    contentLinks: function(type) {
      return (
        <div>
        <ul className="content-links">
          {this.state.contentLinks.filter(function(x){return x.content_type == type;})
            .map(this.eachContentLink, this)
          }
        </ul>
        <button className="btn btn-sm btn-success glyphicon glyphicon-plus"
                onClick={this.addContentLink.bind(null, "New Content Link", type)}/>
        </div>
      );
    },
    render: function() {
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
});
