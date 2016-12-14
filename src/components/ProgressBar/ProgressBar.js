import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

class ProgressBar extends Component {
  render() {
    return (
      <progress className="progress" value={this.props.completed} max={this.props.total} aria-describedby="example"></progress>
    );
  }
}

function mapStateToProps(state, props){
  let tasksWithCats = state.tasks.filter(function(task){
    return task.categoryId;
  });
  let countUncomplitedCats = _.uniq(tasksWithCats.filter(function(task){
    return !task.done;
  }).map(function(task){
    return task.categoryId;
  })).length;

  let countCategoriesWithTasks = _.uniq(tasksWithCats.map(function(task){
    return task.categoryId;
  })).length;

  return {
    completed: countCategoriesWithTasks - countUncomplitedCats,
    total: countCategoriesWithTasks
  };
}

export default connect(mapStateToProps)(ProgressBar);
