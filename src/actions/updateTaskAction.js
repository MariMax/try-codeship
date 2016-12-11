// updateTaskAction


export const ACTION_UPDATE_TASK = 'ACTION_UPDATE_TASK';

export function updateTaskAction(task, title, description, category) {
  return {
    type: ACTION_UPDATE_TASK,
    task: task,
    title: title,
    description: description,
    category: category
  }
}
