import React, { Component } from 'react';
import AddCategory from '../AddCategory/AddCategory';
import AddTask from '../AddTask/AddTask';

import AllCategoriesList from '../AllCategoriesList/AllCategoriesList';
import TasksList from '../TasksList/TasksList';
import { connect } from 'react-redux';

class TasksAndCategories extends Component {

  render() {
    return (
        <div className="container">
          <div className="clearfix m-b-1">
            <div className="float-xs-left">
              <AddCategory/>
            </div>
            <div className="float-xs-right">
              <AddTask/>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-4">
              <AllCategoriesList/>
            </div>
            <div className="col-xs-8">
              <TasksList list={this.props.tasks}/>
            </div>
          </div>
        </div>
    );
  }
}

const mapStateToProps = (state) => ({
  tasks : state.tasks
});

export default connect(mapStateToProps)(TasksAndCategories);
