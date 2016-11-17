// TaskItem
import React, { Component } from 'react';

class TaskItem extends Component {
  render() {
    return (
        <li className="list-group-item">{this.props.task.title}</li>
    );
  }
}

export default TaskItem;
