// TasksList
import React, { PropTypes } from 'react';
import TaskItem from './components/TaskItem/TaskItem';

function TasksList(props){
    return (
      <ul className="list-group pre-scrollable tasks-list">
        {props.list.map((task) => <TaskItem key={task.id} task={task} onDoneChange={props.onDoneChange}/>)}
      </ul>
    );
}

TasksList.propTypes = {
  list : PropTypes.array.isRequired,
  onDoneChange: PropTypes.func.isRequired
};

export default TasksList;
