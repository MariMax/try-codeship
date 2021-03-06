import { ACTION_SET_TASKS_AND_CATEGORIES } from 'actions/setTasksAndCategoriesAction';
import { ACTION_ADD_CATEGORY } from 'actions/addCategoryAction';
import { ACTION_UPDATE_CATEGORY } from 'actions/updateCategoryAction';
import { ACTION_ADD_TASK } from 'actions/addTaskAction';
import { ACTION_UPDATE_TASK } from 'actions/updateTaskAction';
import { ACTION_REMOVE_CATEGORY } from 'actions/removeCategoryAction';

import { combineReducers } from 'redux';
import undoable, { excludeAction } from 'redux-undo';
import _ from 'lodash';

function tasksReducer(state = [], action) {
  if(ACTION_SET_TASKS_AND_CATEGORIES === action.type) {
    return action.tasks;
  }
  if(ACTION_ADD_TASK === action.type) {
    return [{
      id: state.length + 1,
      title: action.title,
      categoryId: action.category ? action.category.id : null
    }, ...state];
  }

  if(ACTION_UPDATE_TASK === action.type) {
    return state.map(function(task){
      if(task.id === action.task.id){
        return Object.assign({}, task,
          _.reduce(action.updates, function(result, value, key){
            switch (key) {
              case 'category':
                result['categoryId'] = value&&value.id;
                break;
              default:
                result[key] = value;
                break;
            }
            return result;
          }, {}));
      }
      return Object.assign({}, task);
    });
  }

  if (ACTION_REMOVE_CATEGORY === action.type){
    return state.filter(task => action.categoriesIds.indexOf(task.categoryId)===-1);
  }

  return state;
}

function categoriesReducer(state = [], action){
  if(ACTION_SET_TASKS_AND_CATEGORIES === action.type) {
    return action.categories;
  }

  if(ACTION_ADD_CATEGORY === action.type) {
    var newCategory = {
      id: (state.length + 1).toString(),
      title: action.title,
      parent: action.parent && action.parent.id
    };
    return [newCategory, ...state];
  }

  if (ACTION_UPDATE_CATEGORY === action.type) {
    return state.map(function(category){
      if(category.id === action.category.id){
        return Object.assign({}, category, { title: action.title });
      }
      return Object.assign({}, category);
    });
  }

  if (ACTION_REMOVE_CATEGORY === action.type){
    return state.filter(cat => action.categoriesIds.indexOf(cat.id)===-1);
  }

  return state;
}

export default undoable(combineReducers({
    tasks: tasksReducer,
    categories: categoriesReducer
}), { filter: excludeAction(ACTION_SET_TASKS_AND_CATEGORIES)});