// TaskItem
import React from 'react';
import { Link } from 'react-router'

function TaskItem(props){
    return (
        <li className="list-group-item clearfix">
          {props.task.title}
          <Link className="btn btn-secondary pull-xs-right"
            to={`/task/${props.task.id}`}>edit</Link>          
        </li>
    );
}

TaskItem.propTypes = {
  task : React.PropTypes.object.isRequired
}

export default TaskItem;
