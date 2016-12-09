import React, { Component } from 'react';
import InputForm from '../InputForm/InputForm';
import InputModal from '../InputModal/InputModal';
import AllCategoriesList from '../AllCategoriesList/AllCategoriesList';
import TasksList from '../TasksList/TasksList';
import { connect } from 'react-redux';

import { addCategoryAction } from 'actions/addCategoryAction';
import { updateCategoryAction } from 'actions/updateCategoryAction';
import { addTaskAction } from 'actions/addTaskAction';

class TasksAndCategories extends Component {
  constructor() {
    super();
    this.state = {};
    this.onAddCategory = this.onAddCategory.bind(this);
    this.onAddTask = this.onAddTask.bind(this);
    this.onAddSubCategoryClick = this.onAddSubCategoryClick.bind(this);
    this.onHideModal = this.onHideModal.bind(this);
    this.onSubmitAddSubCategory = this.onSubmitAddSubCategory.bind(this);
    this.onEditCategoryClick = this.onEditCategoryClick.bind(this);
    this.onSubmitEditCategory = this.onSubmitEditCategory.bind(this);
  }

  onAddCategory(title) {
    this.props.addCategoryAction(title);
  }

  onSubmitAddSubCategory(title){
    this.props.addCategoryAction(title, this.state.addSubCategoryFor);
  }

  onAddSubCategoryClick(parentCategory) {
    this.setState({
      addSubCategoryFor: parentCategory,
      editedCategory:null
    });
  }

  onEditCategoryClick(category) {
    this.setState({
      addSubCategoryFor:null,
      editedCategory: category
    });
  }

  onSubmitEditCategory(title){
    this.props.updateCategoryAction(title, this.state.editedCategory);
  }

  onAddTask(title) {
    this.props.addTaskAction(title);
  }

  onHideModal() {
    this.setState({
      addSubCategoryFor:null,
      editedCategory:null
    });
  }

  render() {
    return (
        <div className="container">
          <div className="clearfix m-b-1">
            <div className="pull-xs-left">
              <InputForm onSubmit={this.onAddCategory} placeholder="Enter category title"/>
            </div>
            <div className="pull-xs-right">
              <InputForm onSubmit={this.onAddTask} placeholder="Enter new task title"/>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-4">
              <AllCategoriesList onEdit={this.onEditCategoryClick} onAddSubCategory={this.onAddSubCategoryClick}/>
            </div>
            <div className="col-xs-8">
              <TasksList list={this.props.tasks}/>
            </div>
          </div>
          {this.state.addSubCategoryFor?(
            <InputModal onSubmit={this.onSubmitAddSubCategory} modalTitle={`Add sub category for "${this.state.addSubCategoryFor.title}"`} placeholder="Enter category name" onHide={this.onHideModal}/>
          ):null}
          {this.state.editedCategory?(
            <InputModal value={this.state.editedCategory.title} onSubmit={this.onSubmitEditCategory} modalTitle={`Edit category "${this.state.editedCategory.title}"`} placeholder="Enter new category name" onHide={this.onHideModal}/>
          ):null}
        </div>
    );
  }
}

const mapStateToProps = (state) => ({
  tasks : state.tasks
});

export default connect(mapStateToProps,
  { addCategoryAction,  addTaskAction, updateCategoryAction })(TasksAndCategories);
