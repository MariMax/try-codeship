import React, { Component, PropTypes } from 'react';
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
            <div className="pull-xs-right">
              <InputForm onSubmit={this.onAddTask} placeholder="Enter new task title"/>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-4">
              <AllCategoriesList
                selectedCategory={this.props.selectedCategory}
                onSelect={this.props.onSelectCategory}
                onEdit={this.onEditCategoryClick}
                onAddSubCategory={this.onAddSubCategoryClick}/>
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


function mapStateToProps(state, props){
  function gatherChildsIds(parentsMap, curCatId){
    let childs = parentsMap[curCatId];
      if(!childs) return [curCatId];
      return [curCatId, ...childs.map(function(cat){
        return gatherChildsIds(parentsMap, cat.id);
      }).reduce(function(res, curEl){
          return res.concat(curEl);
      }, [])];
  }

  function getParentCategoriesIds(categoryId){
    var parentsMap = state.categories.reduce(function(res, cat){
      if(!cat.parent) return res;
      res[cat.parent] = res[cat.parent] || [];
      res[cat.parent].push(cat);
      return res;
    }, {});

    return gatherChildsIds(parentsMap, categoryId);
  }

  var tasks = state.tasks;
  var selectedCategory;
  if(props.filters.category){
    selectedCategory = state.categories.find(function(cat){
      return cat.id.toString() === props.filters.category;
    });
    var catsIds = getParentCategoriesIds(props.filters.category);
    if(catsIds.length){
      tasks = state.tasks.filter(function(task){
        return catsIds.indexOf(task.categoryId)!==-1;
      });
    }
  }

  if(props.filters.query){
    var titleFilter = new RegExp(props.filters.query, 'i');
    tasks = tasks.filter(function(task){
      return titleFilter.test(task.title);
    });
  }

  return {
    tasks : tasks,
    selectedCategory:selectedCategory
  };

}

TasksAndCategories.propTypes = {
  filters:PropTypes.object.isRequired,
  selectedCategory: PropTypes.object,
  onSelectCategory : PropTypes.func.isRequired
}

export default connect(mapStateToProps,
  { addCategoryAction,  addTaskAction, updateCategoryAction })(TasksAndCategories);
