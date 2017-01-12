// updateTaskAction


export const ACTION_UPDATE_TASK = 'ACTION_UPDATE_TASK';

export default function updateTaskAction(task, updates) {
  return {
    type: ACTION_UPDATE_TASK,
    task: task,
    updates: updates  
  }
}
