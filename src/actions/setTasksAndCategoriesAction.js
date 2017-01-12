export const ACTION_SET_TASKS_AND_CATEGORIES = 'ACTION_SET_TASKS_AND_CATEGORIES';

export function setTasksAndCategoriesAction(newTasksList, newCategoriesList) {
  return {
    type: ACTION_SET_TASKS_AND_CATEGORIES,
    tasks: newTasksList,
    categories: newCategoriesList

  }
}
