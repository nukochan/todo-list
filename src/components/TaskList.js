import React from 'react';
import TaskItem from './TaskItem';
import { useTaskContext } from '../contexts/TaskContext';

function TaskList() {
  const { filteredTasks } = useTaskContext();
  const incompleteTasks = filteredTasks.filter(task => !task.completed);

  return (
    <div className="mb-4">
      <h2 className="text-xl font-semibold mb-2">タスク一覧</h2>
      {incompleteTasks.map(task => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
}

export default TaskList;

