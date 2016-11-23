// TasksList
import React, { Component } from 'react';
import TaskItem from './components/TaskItem/TaskItem';
import { loadTasksList } from 'data-providers/tasks/tasks';


class TasksList extends Component {
  constructor(){
    super();
    this.state = {
      list:[]
    };
    this.loadTasks();
  }

  loadTasks(){
    loadTasksList().then(tasksList => {
      this.setState({
          list:tasksList
        });
    });
  }

  render() {
    return (
      <ul className="list-group pre-scrollable tasks-list">
        {this.state.list.map((elem) => <TaskItem key={elem.id} task={elem}/>)}
      </ul>
    );
  }
}

export default TasksList;
