export const ACTION_ADD_TASK = 'ACTION_ADD_TASK';

export function addTaskAction(newTaskTitle, parentCategory = null) {
  return {
    type: ACTION_ADD_TASK,
    title: newTaskTitle,
    category: parentCategory
  }
}
