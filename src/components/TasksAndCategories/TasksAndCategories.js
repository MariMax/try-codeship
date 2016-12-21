import React, { Component, PropTypes } from 'react';
import InputForm from '../InputForm/InputForm';
import InputModal from '../InputModal/InputModal';
import AllCategoriesList from '../AllCategoriesList/AllCategoriesList';
import TasksList from '../TasksList/TasksList';
import { connect } from 'react-redux';

import { addCategoryAction } from 'actions/addCategoryAction';
import { updateCategoryAction } from 'actions/updateCategoryAction';
import { addTaskAction } from 'actions/addTaskAction';
import { updateTaskAction } from 'actions/updateTaskAction';

import { getCategoriesIdsWithUncompletedTasks, getCategoriesIdsWithCompletedTasks } from 'utils/utils';

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
                excludedCategories={this.props.excludedCategories}
                selectedCategory={this.props.selectedCategory}
                onSelect={this.props.onSelectCategory}
                onEdit={this.onEditCategoryClick}
                onAddSubCategory={this.onAddSubCategoryClick}/>
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

function getCurrentAndChildCategoriesIds(categoryId, categories){
  var parentsMap = categories.reduce(function(res, cat){
    if(!cat.parent) return res;
    res[cat.parent] = res[cat.parent] || [];
    res[cat.parent].push(cat);
    return res;
  }, {});
  return gatherChildsIds(parentsMap, categoryId);
}

function gatherChildsIds(parentsMap, curCatId){
  let childs = parentsMap[curCatId];
    if(!childs) return [curCatId];
    return [curCatId, ...childs.map(function(cat){
      return gatherChildsIds(parentsMap, cat.id);
    }).reduce(function(res, curEl){
        return res.concat(curEl);
    }, [])];
}

function mapStateToProps(state, props){
  var tasks = state.tasks.filter(function(task){
    return !!task.done === !!props.filters.is_done;
  });
  var selectedCategory;
  if(props.filters.category){
    selectedCategory = state.categories.find(function(cat){
      return cat.id.toString() === props.filters.category;
    });
    var catsIds = getCurrentAndChildCategoriesIds(props.filters.category, state.categories);
    if(catsIds.length){
      tasks = tasks.filter(function(task){
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
    selectedCategory:selectedCategory,
    excludedCategories: (props.filters.is_done) ? getCategoriesIdsWithUncompletedTasks(state.tasks) 
                                                : getCategoriesIdsWithCompletedTasks(state.tasks)
  };

}

TasksAndCategories.propTypes = {
  filters:PropTypes.object.isRequired,
  selectedCategory: PropTypes.object,
  onSelectCategory : PropTypes.func.isRequired
}

export default connect(mapStateToProps,
  { addCategoryAction,  addTaskAction, updateCategoryAction, updateTaskAction })(TasksAndCategories);
