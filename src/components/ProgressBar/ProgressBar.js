import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getCategoriesIdsWithUncompletedTasks, getCategoriesIdsWithTasks } from 'utils/utils';



class ProgressBar extends Component {
  render() {
    return (
      <progress className="progress" value={this.props.completed} max={this.props.total} aria-describedby="example"></progress>
    );
  }
}

function mapStateToProps(state) {
  var curState = state.present;
  let countUncomplitedCats = getCategoriesIdsWithUncompletedTasks(curState.tasks).length;
  let countCategoriesWithTasks = getCategoriesIdsWithTasks(curState.tasks).length;

  return {
    completed: countCategoriesWithTasks - countUncomplitedCats,
    total: countCategoriesWithTasks
  };
}

export default connect(mapStateToProps)(ProgressBar);