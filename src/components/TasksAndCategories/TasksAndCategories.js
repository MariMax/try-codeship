import React, { Component } from 'react';
import AddCategory from '../AddCategory/AddCategory';
import AddTask from '../AddTask/AddTask';

import CategoriesList from '../CategoriesList/CategoriesList';
import TasksList from '../TasksList/TasksList';
import { loadTasksList, loadCategoriesList } from 'data-providers/tasks/tasks';

class TasksAndCategories extends Component {
  constructor(){
    super();
    this.state = {
      tasksList:[],
      categoiresList:[]
    };
    this.loadCategories();
    this.loadTasks();
  }

  loadTasks(){
    loadTasksList().then(tasksList => {
      this.setState({
          tasksList:tasksList
        });
    });
  }

  loadCategories(){
    loadCategoriesList().then(categoiresList => {
      this.setState({
          categoiresList:categoiresList
        });
    });
  }


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
              <CategoriesList list={this.state.categoiresList}/>
            </div>
            <div className="col-xs-8">
              <TasksList list={this.state.tasksList}/>
            </div>
          </div>
        </div>
    );
  }
}

export default TasksAndCategories;
