import _ from 'lodash';


function getTasksWithCategories(tasksList) {
  return tasksList.filter(task => task.categoryId);
}

export function getCategoriesIdsWithUncompletedTasks(tasksList) {
  return _.uniq(getTasksWithCategories(tasksList)
      .filter(task => !task.done)
      .map(task => task.categoryId));
}

export function getCategoriesIdsWithTasks(tasksList) {
  return _.uniq(getTasksWithCategories(tasksList)
      .map(task => task.categoryId));
}

export function getCategoriesIdsWithCompletedTasks(tasksList) {
  return _.pullAll(getCategoriesIdsWithTasks(tasksList),
      getCategoriesIdsWithUncompletedTasks(tasksList));
}