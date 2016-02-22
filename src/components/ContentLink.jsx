import CopyToClipboard from 'react-copy-to-clipboard';
import Reflux from 'reflux';
import React, { Component, PropTypes } from 'react';
import Router, { Link } from 'react-router';
import { DragSource, DropTarget } from 'react-dnd';

import Actions from '../Actions';
import ItemTypes from './ItemTypes';

const style = {
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  marginBottom: '.5rem',
  backgroundColor: 'white',
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

@DropTarget(ItemTypes.CARD1, cardTarget, connect => ({
  connectDropTarget1: connect.dropTarget()
}))
@DragSource(ItemTypes.CARD1, cardSource, (connect, monitor) => ({
  connectDragSource1: connect.dragSource(),
  isDragging1: monitor.isDragging()
}))

@DropTarget(ItemTypes.CARD2, cardTarget, connect => ({
  connectDropTarget2: connect.dropTarget()
}))
@DragSource(ItemTypes.CARD2, cardSource, (connect, monitor) => ({
  connectDragSource2: connect.dragSource(),
  isDragging2: monitor.isDragging()
}))

@DropTarget(ItemTypes.CARD3, cardTarget, connect => ({
  connectDropTarget3: connect.dropTarget()
}))
@DragSource(ItemTypes.CARD3, cardSource, (connect, monitor) => ({
  connectDragSource3: connect.dragSource(),
  isDragging3: monitor.isDragging()
}))


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
    this.props.onChange(document.getElementById(`this-content-id-${this.props.id}`).value, this.props.id);
    this.setState({ editing: false });
  }

  remove() {
    this.props.onRemove(this.props.id);
  }

  renderDisplay() {
  }

  renderForm() {
  }

  render() {
    const { id, testValue, contentType } = this.props;
    let isDragging = null;
    let connectDragSource = null;
    let connectDropTarget = null;
    if (contentType === 0) {
      connectDragSource = this.props.connectDragSource1;
      connectDropTarget = this.props.connectDropTarget1;
      isDragging = this.props.isDragging1;
    } else if (contentType === 1) {
      connectDragSource = this.props.connectDragSource2;
      connectDropTarget = this.props.connectDropTarget2;
      isDragging = this.props.isDragging2;
    } else {
      connectDragSource = this.props.connectDragSource3;
      connectDropTarget = this.props.connectDropTarget3;
      isDragging = this.props.isDragging3;
    }
    const opacity = isDragging ? 0 : 1;

    if (this.state.editing) {
      return connectDragSource(connectDropTarget(<li>
        <input id={`this-content-id-${id}`} type="text" defaultValue={testValue} />
        <button onClick={this.save} className="btn btn-success btn-sm glyphicon glyphicon-floppy-disk" />
      </li>));
    }
    return connectDragSource(connectDropTarget(<li style={{ ...style, opacity }}>
      {testValue}
      <button onClick={this.edit}
        className="btn btn-primary glyphicon glyphicon-pencil" title="Изменить"
      />
      <button onClick={this.remove}
        className="btn btn-danger glyphicon glyphicon-trash" title="Удалить"
      />
      <CopyToClipboard text={testValue}>
        <button className="btn" type="button" title="Копировать">
          <img className="clippy" src="/images/clippy.svg" width="13" />
        </button>
      </CopyToClipboard>
    </li>));
  }
}

ContentLink.propTypes = {
  id: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  testValue: PropTypes.string.isRequired,
  moveCard: PropTypes.func.isRequired,
  findCard: PropTypes.func.isRequired,
  contentType: PropTypes.number.isRequired,
  connectDragSource1: PropTypes.func,
  connectDropTarget1: PropTypes.func,
  isDragging1: PropTypes.bool,
  connectDragSource2: PropTypes.func,
  connectDropTarget2: PropTypes.func,
  isDragging2: PropTypes.bool,
  connectDragSource3: PropTypes.func,
  connectDropTarget3: PropTypes.func,
  isDragging3: PropTypes.bool
};
