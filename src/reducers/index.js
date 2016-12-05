import { ACTION_SET_TASKS_AND_CATEGORIES } from 'actions/setTasksAndCategoriesAction';


export default function(state, action) {
  if(ACTION_SET_TASKS_AND_CATEGORIES === action.type) {
    // @TODO: fix this:
    /* eslint-disable */
    let { tasks, categories, ...restState } = state;
    /* eslint-enable */

    return Object.assign({}, restState, {
      categories: action.categories,
      tasks: action.tasks
    });
  }
  return state;
}
