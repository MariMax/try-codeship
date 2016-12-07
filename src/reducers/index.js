import { ACTION_SET_TASKS_AND_CATEGORIES } from 'actions/setTasksAndCategoriesAction';
import { ACTION_ADD_CATEGORY } from 'actions/addCategoryAction';

import { combineReducers } from 'redux';

function tasksReducer(state = [], action) {
  if(ACTION_SET_TASKS_AND_CATEGORIES === action.type) {
    return action.tasks;
  }
  return state;
}

function categoriesReducer(state=[], action){
  if(ACTION_SET_TASKS_AND_CATEGORIES === action.type) {
    return action.categories;
  }

  if(ACTION_ADD_CATEGORY === action.type) {
    var newCategory = {
      title: action.title,
      id: state.length
    }
    return [newCategory, ...state];
  }

  return state;
}

export default combineReducers({
    tasks: tasksReducer,
    categories: categoriesReducer
});
