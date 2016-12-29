import React, { Component, PropTypes } from 'react';
import InputForm from '../InputForm/InputForm';
import InputModal from '../InputModal/InputModal';
import CategoriesList from '../CategoriesList/CategoriesList';
import TasksList from '../TasksList/TasksList';
import { connect } from 'react-redux';

import { addCategoryAction } from 'actions/addCategoryAction';
import { updateCategoryAction } from 'actions/updateCategoryAction';
import { addTaskAction } from 'actions/addTaskAction';
import { updateTaskAction } from 'actions/updateTaskAction';
import { removeCategoryAction } from 'actions/removeCategoryAction';
import CategoriesTree, { CategoryStatus } from 'utils/categories-tree';


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
    this.onDoneChange = this.onDoneChange.bind(this);
    this.onRemoveCategoryClick = this.onRemoveCategoryClick.bind(this);
  }
  onDoneChange(task, isDone){
    this.props.updateTaskAction(task, { done: isDone} );
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

  onRemoveCategoryClick(category) {
    if(confirm(`Do you really want remove category "${category.title}"?`)){
      this.props.removeCategoryAction(category);
    }
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
    this.props.addTaskAction(title, this.props.selectedCategory);
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
            {
              this.props.selectedCategory ?
                (<div className="pull-xs-right">
                  <InputForm onSubmit={this.onAddTask} placeholder="Enter new task title"/>
                </div>) : null
            }
          </div>
          <div className="row">
            <div className="col-xs-4">
              <CategoriesList
                  className="list-group pre-scrollable categories-list"
                  onEdit={this.onEditCategoryClick}
                  onAddSubCategory={this.onAddSubCategoryClick}
                  onSelect={this.props.onSelectCategory}
                  onRemove={this.onRemoveCategoryClick}
                  list={this.props.categoriesTree}/>
            </div>
            <div className="col-xs-8">
              <TasksList onDoneChange={this.onDoneChange} list={this.props.tasks}/>
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

function mapStateToProps(state, props){
  let selectedCategory;
  let tasks = state.tasks;
  let categoriesTree = new CategoriesTree(state.categories);
  let isDone = !!props.filters.is_done;

  if(props.filters.query){
    var titleFilter = new RegExp(props.filters.query, 'i');
    categoriesTree.addTasks(tasks.filter(task => !!task.done === isDone && titleFilter.test(task.title)));
    categoriesTree.getList().forEach(function(cat){
      cat.hidden = !cat.tasks.length;
    });
  }
  else{
    categoriesTree.addTasks(tasks);
    categoriesTree.getList().forEach(function(cat){
      cat.hidden = cat.hidden || cat.isStatus((isDone ? CategoryStatus.UNCOMPLETED : CategoryStatus.COMPLETED));
    });
  }

  if(props.filters.category){
    selectedCategory = categoriesTree.getCategory(props.filters.category);
    if(selectedCategory&&!selectedCategory.hidden) categoriesTree.selectBranch(selectedCategory);
  }

  return {
    tasks : selectedCategory?selectedCategory.tasks.filter(task => !!task.done === isDone):[],
    categoriesTree: categoriesTree.getTree(),
    selectedCategory:selectedCategory && !selectedCategory.hidden ? selectedCategory:null
  };

}

TasksAndCategories.propTypes = {
  filters:PropTypes.object.isRequired,
  onSelectCategory : PropTypes.func.isRequired
};

export default connect(mapStateToProps,
  { addCategoryAction,  addTaskAction, updateCategoryAction, updateTaskAction, removeCategoryAction })(TasksAndCategories);
