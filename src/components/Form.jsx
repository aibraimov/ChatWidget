import update from 'react/lib/update';
import Reflux from 'reflux';
import React, { Component, PropTypes } from 'react';
import Router, { Link } from 'react-router';
import { DragSource, DropTarget, DragDropContext } from 'react-dnd';

import Actions from '../Actions';
import ContentLink from './ContentLink';
import ItemTypes from './ItemTypes';

const style = {
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  marginBottom: '.5rem',
  backgroundColor: 'gray',
};

const handleStyle = {
  backgroundColor: 'green',
  width: '1rem',
  height: '1rem',
  display: 'inline-block',
  marginRight: '0.75rem',
  cursor: 'move'
};


const cardSource = {
  beginDrag(props) {
    return {
      id: props.id,
      originalIndex: props.findCard(props.id).index
    };
  },

  endDrag(props, monitor) {
    const { id: droppedId, originalIndex } = monitor.getItem();
    const didDrop = monitor.didDrop();

    if (!didDrop) {
      props.moveCard(droppedId, originalIndex);
    }
  }
};

const cardTarget = {
  canDrop() {
    return false;
  },

  hover(props, monitor) {
    const { id: draggedId } = monitor.getItem();
    const { id: overId } = props;

    if (draggedId !== overId) {
      const { index: overIndex } = props.findCard(overId);
      props.moveCard(draggedId, overIndex);
    }
  }
};
const cardTargetContentLink = {
  drop() {
  }
};


@DropTarget(ItemTypes.CARD1, cardTargetContentLink, connect => ({
  connectDropTarget1: connect.dropTarget()
}))
@DropTarget(ItemTypes.CARD2, cardTargetContentLink, connect => ({
  connectDropTarget2: connect.dropTarget()
}))
@DropTarget(ItemTypes.CARD3, cardTargetContentLink, connect => ({
  connectDropTarget3: connect.dropTarget()
}))
@DropTarget(ItemTypes.FORM, cardTarget, connect => ({
  connectDropTargetForm: connect.dropTarget()
}))
@DragSource(ItemTypes.FORM, cardSource, (connect, monitor) => ({
  connectDragSourceForm: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
  isDraggingForm: monitor.isDragging()
}))


export default class Form extends Component {
  constructor(props) {
    super(props);
    this.moveCard = this.moveCard.bind(this);
    this.findCard = this.findCard.bind(this);
    this.componentWillMount = this.componentWillMount.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.remove = this.remove.bind(this);
    this.nextId = this.nextId.bind(this);
    this.addContentLink = this.addContentLink.bind(this);
    this.removeContentLink = this.removeContentLink.bind(this);
    this.updateContentLink = this.updateContentLink.bind(this);
    this.eachContentLink = this.eachContentLink.bind(this);
    this.contentLinks = this.contentLinks.bind(this);
    this.render = this.render.bind(this);
    this.state = {
      id: this.props.id,
      contentLinks: [
        { id: '' + this.props.id + 1, test_value: 'a' + this.props.id, content_type: 0 },
        { id: '' + this.props.id + 2, test_value: 'b', content_type: 1 },
        { id: '' + this.props.id + 3, test_value: 'c', content_type: 2 }
      ]
    };
  }

  moveCard(id, atIndex) {
    const { contentLink, index } = this.findCard(id);
    this.setState(update(this.state, {
      contentLinks: {
        $splice: [
          [index, 1],
          [atIndex, 0, contentLink]
        ]
      }
    }));
  }

  findCard(id) {
    const { contentLinks } = this.state;
    const contentLink = contentLinks.filter(c => c.id === id)[0];

    return {
      contentLink,
      index: contentLinks.indexOf(contentLink)
    };
  }

  componentWillMount() {

  }

  componentDidMount() {
  }

  remove() {
    this.props.onRemove(this.props.id);
  }

  nextId() {
    this.uniqueId = this.uniqueId || 0;
    return this.uniqueId++;
  }

  addContentLink(event) {
    const type = parseInt(event.target.getAttribute('data-type'), 10);
    const text = 'New content link';
    const { contentLinks } = this.state;
    contentLinks.push({
      id: this.nextId(),
      test_value: text,
      content_type: type
    });
    this.setState({ contentLinks });
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
        id={contentLink.id}
        onChange={this.updateContentLink}
        onRemove={this.removeContentLink}
        testValue={contentLink.test_value}
        contentType={contentLink.content_type}
        moveCard={this.moveCard}
        findCard={this.findCard}
      />
    );
  }

  contentLinks(type) {
    return (
      <div>
      <ul className="content-links">
        {
          this.state.contentLinks.filter(x => x.content_type === type)
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
    const { connectDropTarget1, connectDropTarget2, connectDropTarget3,
      connectDropTargetForm, connectDragSourceForm, connectDragPreview, isDraggingForm } = this.props;
    const opacity = isDraggingForm ? 0 : 1;
    return connectDropTargetForm(connectDragPreview(
      <div style={{ ...style, opacity }}>


        {connectDragSourceForm(
          <div style={handleStyle}></div>
        )}

        this is form{this.props.id}

        <hr />
        <h4>Links</h4>
        {connectDropTarget1(this.contentLinks(0))}

        <hr />
        <h4>Iputs</h4>
        {connectDropTarget2(this.contentLinks(1))}

        <hr />
        <h4>Textareas</h4>
        {connectDropTarget3(this.contentLinks(2))}

        <hr />
        <h4>Delete</h4>
        <button onClick={this.remove}
          className="btn btn-danger glyphicon glyphicon-trash" title="Удалить"
        />
      </div>
    ));
  }
}

Form.propTypes = {
  id: PropTypes.number.isRequired,
  onRemove: PropTypes.func.isRequired,
  moveCard: PropTypes.func.isRequired,
  findCard: PropTypes.func.isRequired,
  connectDropTarget1: PropTypes.func,
  connectDropTarget2: PropTypes.func,
  connectDropTarget3: PropTypes.func,
  connectDragSourceForm: PropTypes.func,
  connectDropTargetForm: PropTypes.func,
  connectDragPreview: PropTypes.func,
  isDraggingForm: PropTypes.bool
};
