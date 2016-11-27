// TaskItem
import React from 'react';
import { Link } from 'react-router'

function TaskItem(props){
    return (
        <li className="list-group-item clearfix">
          {props.task.title}
          <Link className="btn btn-secondary float-xs-right" to='/edit'>edit</Link>          
        </li>
    );
}

TaskItem.propTypes = {
  task : React.PropTypes.object.isRequired
}

export default TaskItem;
