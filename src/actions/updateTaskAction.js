// updateTaskAction


export const ACTION_UPDATE_TASK = 'ACTION_UPDATE_TASK';

export function updateTaskAction(task, title, description, category, isDone=false) {
  return {
    type: ACTION_UPDATE_TASK,
    task: task,
    title: title,
    description: description,
    category: category,
    done: isDone
  }
}
