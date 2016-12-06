import { ACTION_SET_TASKS_AND_CATEGORIES } from 'actions/setTasksAndCategoriesAction';
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
  return state;
}

export default combineReducers({
    tasks: tasksReducer,
    categories: categoriesReducer
});
