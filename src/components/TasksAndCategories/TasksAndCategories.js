import React, { Component } from 'react';
import InputForm from '../InputForm/InputForm';

import AllCategoriesList from '../AllCategoriesList/AllCategoriesList';
import TasksList from '../TasksList/TasksList';
import { connect } from 'react-redux';

import { addCategoryAction } from 'actions/addCategoryAction';
import { addTaskAction } from 'actions/addTaskAction';

class TasksAndCategories extends Component {
  constructor() {
    super();
    this.onAddCategory = this.onAddCategory.bind(this);
    this.onAddTask = this.onAddTask.bind(this);
  }

  onAddCategory(title) {
    this.props.addCategoryAction(title);
  }

  onAddTask(title) {
    this.props.addTaskAction(title);
  }

  render() {
    return (
        <div className="container">
          <div className="clearfix m-b-1">
            <div className="float-xs-left">
              <InputForm onSubmit={this.onAddCategory} placeholder="Enter category title"/>
            </div>
            <div className="float-xs-right">
              <InputForm onSubmit={this.onAddTask} placeholder="Enter new task title"/>
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

export default connect(mapStateToProps, { addCategoryAction,  addTaskAction})(TasksAndCategories);
