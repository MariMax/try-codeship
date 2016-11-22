// TaskItem
import React, { Component } from 'react';
import { Link } from 'react-router'

class TaskItem extends Component {
  render() {
    return (
        <li className="list-group-item clearfix">{this.props.task.title} <Link className="btn btn-secondary float-xs-right" to='/edit'>edit</Link></li>
    );
  }
}

export default TaskItem;
