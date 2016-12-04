export const ACTION_SET_TASKS_LIST = 'ACTION_SET_TASKS_LIST';

export function setTasksListAction(newTasksList) {
  return {
    type: ACTION_SET_TASKS_LIST,
    tasks: newTasksList
  }
}
