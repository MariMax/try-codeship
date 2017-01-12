// TaskItem
import React, { PropTypes } from 'react';
import { Link } from 'react-router'

function TaskItem(props){
  var task = props.task;

  function onDoneChange(e){
    props.onDoneChange(task, e.target.checked);
  }

  return (
      <li className="list-group-item d-flex flex-items-xs-middle flex-items-xs-between">
        <div>{task.title}</div>

        <div>
          <input type="checkbox" onChange={onDoneChange} checked={!!task.done}/>
          <Link className="btn btn-secondary m-l-1"
            to={`/task/${task.id}`}>edit</Link>
        </div>
      </li>
  );
}

TaskItem.propTypes = {
  task: PropTypes.object.isRequired,
  onDoneChange: PropTypes.func.isRequired
};

export default TaskItem;
