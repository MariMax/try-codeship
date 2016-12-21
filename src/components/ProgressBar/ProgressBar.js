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

function mapStateToProps(state, props) { 
  let countUncomplitedCats = getCategoriesIdsWithUncompletedTasks(state.tasks).length;  
  let countCategoriesWithTasks = getCategoriesIdsWithTasks(state.tasks).length;

  return {
    completed: countCategoriesWithTasks - countUncomplitedCats,
    total: countCategoriesWithTasks
  };
}

export default connect(mapStateToProps)(ProgressBar);