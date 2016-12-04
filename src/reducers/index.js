import { ACTION_SET_CATEGORIES_LIST } from 'actions/setCategoriesListAction';
import { ACTION_SET_TASKS_LIST } from 'actions/setTasksListAction';

export default function(state, action) {
  if(ACTION_SET_CATEGORIES_LIST === action.type) {
    // @TODO: fix this:
    /* eslint-disable */
    let { categories, ...restState } = state;
    /* eslint-enable */

    return Object.assign({}, restState, { categories: action.categories });
  }

  if(ACTION_SET_TASKS_LIST === action.type) {
    // @TODO: fix this:
    /* eslint-disable */
    let { tasks, ...restState } = state;
    /* eslint-enable */

    return Object.assign({}, restState, { tasks: action.tasks });
  }

  return state;
}
