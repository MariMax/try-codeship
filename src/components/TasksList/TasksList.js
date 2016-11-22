// TasksList
import React, { Component } from 'react';
import TaskItem from './components/TaskItem/TaskItem';
class TasksList extends Component {
  render() {
    return (
      <ul className="list-group pre-scrollable tasks-list">
        {this.props.list.map((elem) => <TaskItem key={elem.id} task={elem}/>)}
      </ul>
    );
  }
}

export default TasksList;
