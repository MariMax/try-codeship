import { ACTION_SET_TASKS_AND_CATEGORIES } from 'actions/setTasksAndCategoriesAction';
import { ACTION_ADD_CATEGORY } from 'actions/addCategoryAction';
import { ACTION_UPDATE_CATEGORY } from 'actions/updateCategoryAction';
import { ACTION_ADD_TASK } from 'actions/addTaskAction';

import { combineReducers } from 'redux';

function tasksReducer(state = [], action) {
  if(ACTION_SET_TASKS_AND_CATEGORIES === action.type) {
    return action.tasks;
  }
  if(ACTION_ADD_TASK === action.type) {
    return [{
      id: state.length + 1,
      title: action.title
    }, ...state];
  }
  return state;
}

function categoriesReducer(state = [], action){
  if(ACTION_SET_TASKS_AND_CATEGORIES === action.type) {
    return action.categories;
  }

  if(ACTION_ADD_CATEGORY === action.type) {
    var newCategory = {
      title: action.title,
      id: state.length + 1,
      parent: action.parent && action.parent.id
    }
    return [newCategory, ...state];
  }

  if (ACTION_UPDATE_CATEGORY === action.type) {
    return state.map(function(category){
      if(category.id === action.category.id){
        return Object.assign({}, action.category, { title: action.title });
      }
      return Object.assign({}, category);
    })
  }

  return state;
}

export default combineReducers({
    tasks: tasksReducer,
    categories: categoriesReducer
});
