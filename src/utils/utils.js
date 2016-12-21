import _ from 'lodash';


function getTasksWithCategories(tasksList) {
  return tasksList.filter(function(task){
    return task.categoryId;
  });
}

export function getCategoriesIdsWithUncompletedTasks(tasksList) {
  return _.uniq(getTasksWithCategories(tasksList).filter(function(task){
    return !task.done;
  }).map(function(task){
    return task.categoryId;
  }));	
}

export function getCategoriesIdsWithTasks(tasksList) {
  return _.uniq(getTasksWithCategories(tasksList).map(function(task){
    return task.categoryId;
  }))
}

export function getCategoriesIdsWithCompletedTasks(tasksList) {
  return _.pullAll(getCategoriesIdsWithTasks(tasksList), getCategoriesIdsWithUncompletedTasks(tasksList));
}