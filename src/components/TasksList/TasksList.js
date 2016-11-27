// TasksList
import React from 'react';
import TaskItem from './components/TaskItem/TaskItem';

function TasksList(props){
    return (
      <ul className="list-group pre-scrollable tasks-list">
        {props.list.map((task) => <TaskItem key={task.id} task={task}/>)}
      </ul>
    );
}

TasksList.propTypes = {
  list : React.PropTypes.array.isRequired
}

export default TasksList;
