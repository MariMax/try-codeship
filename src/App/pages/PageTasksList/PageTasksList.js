// PageTasksList
import React, { Component } from 'react';

import Header from 'App/components/Header/Header';
import ProgressBar from 'App/components/ProgressBar/ProgressBar';
import TasksAndCategories from 'App/components/TasksAndCategories/TasksAndCategories'

class PageTasksList extends Component {
  render() {
    return (
        <div>
          <Header title="To-Do List" showTaskFilter={true}/>
          <ProgressBar/>
          <TasksAndCategories
            categories={this.props.categories}
            tasks={this.props.tasks}/>
        </div>
    );
  }
}

export default PageTasksList;
